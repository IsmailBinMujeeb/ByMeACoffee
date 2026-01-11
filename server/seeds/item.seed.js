import menuItemModel from "../models/menu.item.model.js";
import { Types } from "mongoose";
import db from "../config/db.js";

const menuItemsData = [
  {
    _id: new Types.ObjectId("68ef239cf955c43751771db0"),
    itemName: "Classic Espresso",
    price: 149,
    imageUrl:
      "https://t3.ftcdn.net/jpg/15/87/65/92/360_F_1587659204_8lzNToloDjNBj4iOEnBJthZa9SP4FFXZ.jpg",
    description:
      "Rich and bold single-shot espresso made from freshly ground premium coffee beans",
  },
  {
    _id: new Types.ObjectId("68ef239cf955c43751771db1"),
    itemName: "Cappuccino",
    price: 199,
    imageUrl:
      "https://www.allrecipes.com/thmb/chsZz0jqIHWYz39ViZR-9k_BkkE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8624835-how-to-make-a-cappuccino-beauty-4x3-0301-13d55eaad60b42058f24369c292d4ccb.jpg",
    description:
      "Perfect balance of espresso, steamed milk, and thick creamy milk foam",
  },
  {
    _id: new Types.ObjectId("68ef239cf955c43751771db2"),
    itemName: "Caffè Latte",
    price: 219,
    imageUrl:
      "https://coffeebros.com/cdn/shop/articles/unnamed_be2775a1-186d-40c1-b094-488fa5fa4050.png?v=1675965693",
    description:
      "Smooth espresso blended with hot steamed milk and a light foam layer",
  },
  {
    _id: new Types.ObjectId("68ef239cf955c43751771db3"),
    itemName: "Indiano",
    price: 179,
    imageUrl:
      "https://www.nescafe.com/sites/default/files/2024-09/Nes_ConEco3.0_B2_Article24-YourCompleteCoffeeCupGuide_Image%208-1066%20%C3%97%20970.jpg",
    description:
      "Espresso diluted with hot water for a clean, strong, and smooth taste",
  },
  {
    _id: new Types.ObjectId("68ef239cf955c43751771db4"),
    itemName: "Mocha Coffee",
    price: 249,
    imageUrl:
      "https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/the_perfect_mocha_coffee_29100_16x9.jpg",
    description:
      "Espresso mixed with rich chocolate syrup, steamed milk, and whipped cream",
  },
  {
    _id: new Types.ObjectId("68ef239cf955c43751771db5"),
    itemName: "Caramel Macchiato",
    price: 269,
    imageUrl:
      "https://dinnerthendessert.com/wp-content/uploads/2023/10/Caramel-Macchiato-10.jpg",
    description:
      "Vanilla-flavored milk topped with espresso and finished with caramel drizzle",
  },
  {
    _id: new Types.ObjectId("68ef239cf955c43751771db6"),
    itemName: "Flat White",
    price: 229,
    imageUrl:
      "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?w=500",
    description: "Velvety microfoam milk poured over a double shot of espresso",
  },
  {
    _id: new Types.ObjectId("68ef239cf955c43751771db7"),
    itemName: "Cold Brew Coffee",
    price: 259,
    imageUrl:
      "https://lifesimplified.gorenje.com/wp-content/uploads/2024/06/gorenje-blog-refreshing_cold_brew_coffee.jpg",
    description:
      "Slow-steeped cold brew coffee with a naturally smooth and less acidic flavor",
  },
  {
    _id: new Types.ObjectId("68ef239cf955c43751771db8"),
    itemName: "Iced Latte",
    price: 239,
    imageUrl:
      "https://myeverydaytable.com/wp-content/uploads/ICEDLATTE_0_4.jpg",
    description:
      "Chilled espresso with cold milk and ice for a refreshing coffee experience",
  },
  {
    _id: new Types.ObjectId("68ef239cf955c43751771db9"),
    itemName: "Hazelnut Coffee",
    price: 249,
    imageUrl:
      "https://media.istockphoto.com/id/1095097380/photo/homemade-hazelnut-coffee-latte.jpg?s=612x612&w=0&k=20&c=Q-zgW6WMm_lKU5JV21LErA6WNu4kk38Fna9U8v2wdgI=",
    description:
      "Smooth brewed coffee infused with rich and nutty hazelnut flavor",
  },
  {
    _id: new Types.ObjectId("68ef239cf955c43751771dba"),
    itemName: "Vanilla Latte",
    price: 249,
    imageUrl:
      "https://www.bbassets.com/media/uploads/p/l/40337926_2-starbucks-coffee-vanilla-latte-tall.jpg",
    description:
      "Classic latte sweetened with aromatic vanilla syrup and steamed milk",
  },
  {
    _id: new Types.ObjectId("68ef239cf955c43751771dbb"),
    itemName: "Irish Coffee",
    price: 329,
    imageUrl:
      "https://myradkitchen.com/wp-content/uploads/2024/12/Espresso-Irish-Coffee-Easy-Drinks-Cocktails-My-Rad-Kitchen-0007-RC.jpg",
    description:
      "Hot coffee blended with Irish whiskey, sugar, and topped with cream",
  },
];

(async function () {
  await db();

  await menuItemModel.deleteMany();
  console.log("Cleared existing items");
  const items = await menuItemModel.insertMany(menuItemsData);

  console.log(items);
  process.exit(0);
})();
