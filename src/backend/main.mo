import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Blob "mo:core/Blob";
import Runtime "mo:core/Runtime";
import MixinStorage "blob-storage/Mixin";
import MixinAuthorization "authorization/MixinAuthorization";
import Storage "blob-storage/Storage";
import AccessControl "authorization/access-control";

actor {
  type Product = {
    id : Nat;
    name : Text;
    description : Text;
    price : Nat;
    category : Text;
    image : Storage.ExternalBlob;
    inStock : Bool;
  };

  module Product {
    public func compare(p1 : Product, p2 : Product) : { #greater; #less; #equal } {
      Nat.compare(p1.id, p2.id);
    };
  };

  public type UserProfile = {
    name : Text;
  };

  let products = Map.empty<Nat, Product>();
  var nextProductId = 1;

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  let userProfiles = Map.empty<Principal, UserProfile>();

  // User profile functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
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

  // Public query functions - no authorization needed
  public query ({ caller }) func getAllProducts() : async [Product] {
    products.values().toArray().sort();
  };

  public query ({ caller }) func getProductsByCategory(category : Text) : async [Product] {
    products.values().toArray().filter(func(product) { product.category == category });
  };

  public query ({ caller }) func getProduct(id : Nat) : async Product {
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) { product };
    };
  };

  // Admin-only mutation functions
  public shared ({ caller }) func addProduct(product : Product) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    let newProductId = nextProductId;
    let newProduct : Product = {
      product with id = newProductId;
    };
    products.add(newProductId, newProduct);
    nextProductId += 1;
    newProductId;
  };

  public shared ({ caller }) func updateProduct(product : Product) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    if (not products.containsKey(product.id)) { Runtime.trap("Cannot update - product not found") };
    products.add(product.id, product);
  };

  public shared ({ caller }) func deleteProduct(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    if (not products.containsKey(id)) { Runtime.trap("Product not found") };
    products.remove(id);
  };

  public shared ({ caller }) func setStock(id : Nat, inStock : Bool) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) {
        let updatedProduct : Product = {
          product with inStock
        };
        products.add(id, updatedProduct);
      };
    };
  };

  // Initialize with 6 sample products - admin only
  public shared ({ caller }) func initializeProducts() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };

    let defaultBlob : Blob = Blob.fromArray([]);
    let initialProducts : [Product] = [
      {
        id = nextProductId;
        name = "Sunset 3D Painting";
        description = "A beautiful 3D painting of a sunset.";
        price = 5000;
        category = "3D Paintings";
        image = defaultBlob;
        inStock = true;
      },
      {
        id = nextProductId + 1;
        name = "Traditional Pencil Set";
        description = "A set of traditional pencils for sketching.";
        price = 1500;
        category = "Traditional Pencils";
        image = defaultBlob;
        inStock = true;
      },
      {
        id = nextProductId + 2;
        name = "Keychain Pack";
        description = "A pack of decorative keychains.";
        price = 800;
        category = "Keychains";
        image = defaultBlob;
        inStock = true;
      },
      {
        id = nextProductId + 3;
        name = "Jute Folder";
        description = "Eco-friendly jute folder for documents.";
        price = 2000;
        category = "Jute Folders";
        image = defaultBlob;
        inStock = true;
      },
      {
        id = nextProductId + 4;
        name = "Jute Bag";
        description = "Handmade jute bag.";
        price = 3000;
        category = "Jute Bags";
        image = defaultBlob;
        inStock = true;
      },
      {
        id = nextProductId + 5;
        name = "Floral 3D Painting";
        description = "A stunning floral 3D painting.";
        price = 6000;
        category = "3D Paintings";
        image = defaultBlob;
        inStock = true;
      },
    ];

    for (product in initialProducts.values()) {
      products.add(product.id, product);
    };

    nextProductId += initialProducts.size();
  };
};
