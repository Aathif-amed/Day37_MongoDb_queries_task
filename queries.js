//find all
db.products.find().pretty();
// between 400 and 800
db.products.find({ product_price: { $gt: 400, $lt: 800 } });
//not between 400 to 600
db.products.find({ product_price: { $not: { $gt: 400, $lt: 600 } } });
// List the four product which are grater than 500 in price
db.products.find({ product_price: { $gt: 500 } }).limit(4); //but there are only 3 records
// Find the product name and product material of each products
db.products.aggregate({ $project: { product_name: 1, product_material: 1 } });
// Find the product with a row id of 10
db.products.find({ product_id: 10 });
// Find only the product name and product material
db.products
  .aggregate({ $project: { product_name: 1, product_material: 1, _id: 0 } })
  .pretty();
// Find all products which contain the value of soft in product material
db.products.find({ product_color: "Soft" });
// Find products which contain product color indigo  and product price 492.00
db.products.find({
  $and: [{ product_color: "indigo" }, { product_price: 492 }],
}); //there are no products which has color indigo and price 492
// Delete the products which product price value are same
db.products
  .aggregate([
    { $group: { _id: "$product_price", count: { $sum: 1 } } },
    { $match: { count: { $gt: 1 } } },
  ])
  .forEach((doc) => {
    db.products.deleteOne({ product_price: doc._id });
  });
