import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Migration "migration";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import Iter "mo:core/Iter";
import Array "mo:core/Array";

(with migration = Migration.run)
actor {
  // Initialize the access control system
  let accessControlState = AccessControl.initState();

  include MixinAuthorization(accessControlState);
  include MixinStorage();

  // User Profile Type
  public type UserProfile = {
    name : Text;
    email : Text;
    mobile : Text;
    city : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  type Product = {
    id : Nat;
    name : Text;
    description : Text;
    price : Nat;
    category : Text;
    imageUrls : [Text];
    inStock : Bool;
    isFeatured : Bool;
    quantity : Nat;
    addedAt : Int;
  };

  type SignupEntry = {
    id : Nat;
    fullName : Text;
    email : Text;
    mobile : Text;
    city : Text;
    timestamp : Int;
  };

  type ContactMessage = {
    id : Nat;
    name : Text;
    email : Text;
    mobile : Text;
    message : Text;
    timestamp : Int;
  };

  let products = Map.empty<Nat, Product>();
  var nextProductId = 1;
  let signups = Map.empty<Nat, SignupEntry>();
  var nextSignupId = 1;
  let contactMessages = Map.empty<Nat, ContactMessage>();
  var nextContactId = 1;

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Role Management
  public shared ({ caller }) func initializeAdmin(adminToken : Text, userProvidedToken : Text) : async () {
    AccessControl.initialize(accessControlState, caller, adminToken, userProvidedToken);
  };

  public shared ({ caller }) func assignRole(user : Principal, role : AccessControl.UserRole) : async () {
    AccessControl.assignRole(accessControlState, caller, user, role);
  };

  public query ({ caller }) func getMyRole() : async AccessControl.UserRole {
    AccessControl.getUserRole(accessControlState, caller);
  };

  // Product Query Functions (Public - no auth needed)
  public query func getAllProducts() : async [Product] {
    products.values().toArray();
  };

  public query func getProduct(id : Nat) : async Product {
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) { product };
    };
  };

  public query func searchProducts(term : Text) : async [Product] {
    products.values().toArray().filter(
      func(p) {
        p.name.toLower().contains(#text(term.toLower())) or p.description.toLower().contains(#text(term.toLower()));
      }
    );
  };

  public query func getProductsByCategory(category : Text) : async [Product] {
    products.values().toArray().filter(func(p) { p.category == category });
  };

  public query func getFeaturedProducts() : async [Product] {
    products.values().toArray().filter(func(p) { p.isFeatured });
  };

  public query func getRecentProducts() : async [Product] {
    products.values().toArray().sort(func(a, b) { if (a.addedAt > b.addedAt) { #greater } else { #less } });
  };

  // Product Management Functions (Admin-only)
  public shared ({ caller }) func addProduct(name : Text, description : Text, price : Nat, category : Text, imageUrls : [Text], inStock : Bool, isFeatured : Bool, quantity : Nat) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add products");
    };
    let id = nextProductId;
    products.add(
      id,
      {
        id;
        name;
        description;
        price;
        category;
        imageUrls;
        inStock;
        isFeatured;
        quantity;
        addedAt = Time.now();
      },
    );
    nextProductId += 1;
    id;
  };

  public shared ({ caller }) func updateProduct(id : Nat, name : Text, description : Text, price : Nat, category : Text, imageUrls : [Text], inStock : Bool, isFeatured : Bool, quantity : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) {
        products.add(
          id,
          {
            id;
            name;
            description;
            price;
            category;
            imageUrls;
            inStock;
            isFeatured;
            quantity;
            addedAt = product.addedAt;
          },
        );
      };
    };
  };

  public shared ({ caller }) func deleteProduct(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };
    if (not products.containsKey(id)) { Runtime.trap("Product not found") };
    products.remove(id);
  };

  public shared ({ caller }) func setStock(id : Nat, inStock : Bool, quantity : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update stock");
    };
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) {
        products.add(id, { product with inStock; quantity });
      };
    };
  };

  public shared ({ caller }) func markProductAsFeatured(id : Nat, isFeatured : Bool) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can mark products as featured");
    };
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) {
        products.add(id, { product with isFeatured });
      };
    };
  };

  // Signup Functions
  public shared ({ caller }) func submitSignup(fullName : Text, email : Text, mobile : Text, city : Text) : async Nat {
    // Public - anyone including guests can sign up
    let id = nextSignupId;
    signups.add(id, { id; fullName; email; mobile; city; timestamp = Time.now() });
    nextSignupId += 1;
    id;
  };

  public query ({ caller }) func getAllSignups() : async [SignupEntry] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view signups");
    };
    signups.values().toArray();
  };

  public query ({ caller }) func getSignupsByCity(city : Text) : async [SignupEntry] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view signups");
    };
    signups.values().toArray().filter(func(s) { s.city == city });
  };

  // Contact Message Functions
  public shared ({ caller }) func submitContactMessage(name : Text, email : Text, mobile : Text, message : Text) : async Nat {
    // Public - anyone including guests can submit contact messages
    let id = nextContactId;
    contactMessages.add(id, { id; name; email; mobile; message; timestamp = Time.now() });
    nextContactId += 1;
    id;
  };

  public query ({ caller }) func getAllContactMessages() : async [ContactMessage] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view contact messages");
    };
    contactMessages.values().toArray();
  };
};
