
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";


actor {
  type Product = {
    id : Nat;
    name : Text;
    description : Text;
    price : Nat;
    category : Text;
    imageUrl : Text;
    inStock : Bool;
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

  public query func getAllProducts() : async [Product] {
    products.values().toArray();
  };

  public query func getProductsByCategory(category : Text) : async [Product] {
    products.values().toArray().filter(func(p) { p.category == category });
  };

  public query func getProduct(id : Nat) : async Product {
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) { product };
    };
  };

  public shared func addProduct(name : Text, description : Text, price : Nat, category : Text, imageUrl : Text, inStock : Bool) : async Nat {
    let id = nextProductId;
    products.add(id, { id; name; description; price; category; imageUrl; inStock });
    nextProductId += 1;
    id;
  };

  public shared func updateProduct(id : Nat, name : Text, description : Text, price : Nat, category : Text, imageUrl : Text, inStock : Bool) : async () {
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?_) {
        products.add(id, { id; name; description; price; category; imageUrl; inStock });
      };
    };
  };

  public shared func deleteProduct(id : Nat) : async () {
    if (not products.containsKey(id)) { Runtime.trap("Product not found") };
    products.remove(id);
  };

  public shared func setStock(id : Nat, inStock : Bool) : async () {
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) {
        products.add(id, { product with inStock });
      };
    };
  };

  public shared func submitSignup(fullName : Text, email : Text, mobile : Text, city : Text) : async Nat {
    let id = nextSignupId;
    signups.add(id, { id; fullName; email; mobile; city; timestamp = Time.now() });
    nextSignupId += 1;
    id;
  };

  public query func getAllSignups() : async [SignupEntry] {
    signups.values().toArray();
  };

  public shared func submitContactMessage(name : Text, email : Text, mobile : Text, message : Text) : async Nat {
    let id = nextContactId;
    contactMessages.add(id, { id; name; email; mobile; message; timestamp = Time.now() });
    nextContactId += 1;
    id;
  };

  public query func getAllContactMessages() : async [ContactMessage] {
    contactMessages.values().toArray();
  };
};
