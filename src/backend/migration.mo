import Map "mo:core/Map";
import Nat "mo:core/Nat";

module {
  type OldProduct = {
    id : Nat;
    name : Text;
    description : Text;
    price : Nat;
    category : Text;
    imageUrl : Text;
    inStock : Bool;
  };

  type OldActor = {
    products : Map.Map<Nat, OldProduct>;
    nextProductId : Nat;
  };

  type NewProduct = {
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

  type NewActor = {
    products : Map.Map<Nat, NewProduct>;
    nextProductId : Nat;
  };

  public func run(old : OldActor) : NewActor {
    let newProducts = old.products.map<Nat, OldProduct, NewProduct>(
      func(_id, oldProduct) {
        {
          id = oldProduct.id;
          name = oldProduct.name;
          description = oldProduct.description;
          price = oldProduct.price;
          category = oldProduct.category;
          imageUrls = [oldProduct.imageUrl];
          inStock = oldProduct.inStock;
          isFeatured = false;
          quantity = 0;
          addedAt = 0;
        };
      }
    );
    {
      products = newProducts;
      nextProductId = old.nextProductId;
    };
  };
};
