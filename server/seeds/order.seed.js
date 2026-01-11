import { Types } from "mongoose";
import db from "../config/db.js";
import orderModel from "../models/order.model.js";
import menuItemModel from "../models/menu.item.model.js";

const ordersData = [
  {
    _id: new Types.ObjectId(),
    itemId: "68ef239cf955c43751771db0",
    status: "complete",
    total: 219,
    createdBy: "68ef22fea58af19c33ce4247",
  },
  {
    _id: new Types.ObjectId(),
    itemId: "68ef239cf955c43751771db1",
    status: "served",
    total: 159,
    createdBy: "68ef22fea58af19c33ce4248",
  },
  {
    _id: new Types.ObjectId(),
    itemId: "68ef239cf955c43751771db2",
    status: "pending",
    total: 159,
    createdBy: "68ef22fea58af19c33ce4247",
  },
  {
    _id: new Types.ObjectId(),
    itemId: "68ef239cf955c43751771db3",
    total: 159,
    status: "complete",
    createdBy: "68ef22fea58af19c33ce4249",
  },
  {
    _id: new Types.ObjectId(),
    itemId: "68ef239cf955c43751771db6",
    total: 321,
    status: "served",
    createdBy: "68ef22fea58af19c33ce4248",
  },
  {
    _id: new Types.ObjectId(),
    itemId: "68ef239cf955c43751771db3",
    total: 329,
    status: "pending",
    createdBy: "68ef22fea58af19c33ce4247",
  },
  {
    _id: new Types.ObjectId(),
    itemId: "68ef239cf955c43751771db3",
    total: 343,
    status: "complete",
    createdBy: "68ef22fea58af19c33ce4249",
  },
  {
    _id: new Types.ObjectId(),
    itemId: "68ef239cf955c43751771db6",
    total: 350,
    status: "complete",
    createdBy: "68ef22fea58af19c33ce4249",
  },
  {
    _id: new Types.ObjectId(),
    itemId: "68ef239cf955c43751771db3",
    total: 231,
    status: "cancel",
    createdBy: "68ef22fea58af19c33ce4249",
  },
  {
    _id: new Types.ObjectId(),
    itemId: "68ef239cf955c43751771db3",
    total: 232,
    status: "served",
    createdBy: "68ef22fea58af19c33ce4247",
  },
  {
    _id: new Types.ObjectId(),
    itemId: "68ef239cf955c43751771db2",
    total: 232,
    status: "pending",
    createdBy: "68ef22fea58af19c33ce4248",
  },
  {
    _id: new Types.ObjectId(),
    itemId: "68ef239cf955c43751771db1",
    total: 232,
    status: "complete",
    createdBy: "68ef22fea58af19c33ce4248",
  },
  {
    _id: new Types.ObjectId(),
    itemId: "68ef239cf955c43751771db0",
    total: 232,
    status: "pending",
    createdBy: "68ef22fea58af19c33ce4249",
  },
];

(async function () {
  await db();

  await orderModel.deleteMany({});
  console.log("Cleared existing orders");

  await orderModel.insertMany(ordersData);
  console.log(`Successfully seeded ${ordersData.length} orders`);

  // Display summary
  console.log("\n--- Order Summary ---");
  ordersData.forEach((order) => {
    console.log(
      `Order #${order._id} - Status: ${order.status} - Total: ₹${order.total}`,
    );
  });

  process.exit(0);
})();
