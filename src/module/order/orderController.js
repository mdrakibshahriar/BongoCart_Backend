const { ObjectId } = require("mongodb");
const SSLCommerzPayment = require("sslcommerz-lts");
const Order = require("./orderModel");
const Product = require("../products/productModel");
const productService = require("../products/productService");
const is_live = false;

const addOrder = async (req, res, next) => {
  try {
    const order = req.body;
    const email = order.data.email;
    const products = order.cartProducts;
    const total_price = products.reduce((acc, product) => {
      const sub_total = product.quantity * product.price;
      return acc + sub_total;
    });
    const transactionId = new ObjectId().toString();
    const data = {
      total_amount: total_price,
      currency: "BDT",
      tran_id: transactionId, // use unique tran_id for each api call
      success_url: `http://localhost:3000/api/v1/order/payment-success${transactionId}`,
      fail_url: "http://localhost:3000/api/v1/order/payment-fail",
      cancel_url: "http://localhost:3000/api/v1/order/payment-cancel",
      ipn_url: "http://localhost:3030/ipn",
      shipping_method: "Courier",
      product_name: "Computer.",
      product_category: "Electronic",
      product_profile: "general",
      cus_name: order.data.name,
      cus_email: email,
      cus_add1: order.data.address,
      cus_city: order.data.city,
      cus_state: "Dhaka",
      cus_postcode: "1000",
      cus_country: "Bangladesh",
      cus_phone: order.data.phone,
      cus_fax: "01711111111",
      ship_name: "Customer Name",
      ship_add1: "Dhaka",
      ship_add2: "Dhaka",
      ship_city: "Dhaka",
      ship_state: "Dhaka",
      ship_postcode: 1000,
      ship_country: "Bangladesh",
    };

    const sslcz = new SSLCommerzPayment(
      process.env.STORE_ID,
      process.env.STORE_PASSWORD,
      is_live,
    );

    sslcz.init(data).then((apiResponse) => {
      // Redirect the user to payment gateway
      let GatewayPageURL = apiResponse.GatewayPageURL;
      res.json({
        payment: success,
        url: GatewayPageURL,
      });
      console.log("Redirecting to: ", GatewayPageURL);
    });

    for (const product of products) {
      console.log(product);
      await productService.updateSales(product._id, product.quantity);
      await productService.updateAvailableQuantity(
        product._id,
        product.quantity,
      );
    }
    const finalOrder = {
      products,
      paidStatus: false,
      transactionId: transactionId,
      email: email,
      deliveryStatus: "Processing",
    };
    const result = Order.create(finalOrder);
  } catch (error) {
    next(error);
  }
};

const successPayment = async (req, res, next) => {
  try {
    const result = await Order.updateOne(
      { transactionId: req.params.transactionId },
      { paidStatus: true },
    );
    if (result.modifiedCount === 1) {
      res.redirect("http://localhost:3000/payment-success");
    } else {
      res.status(404).json({ message: "Document not found" });
    }
  } catch (error) {
    next(error);
  }
};

const getOrderList = async (req, res, next) => {
  try {
    const data = await Order.find({ email: req.params.email });
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Orders found",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const adminGetOrders = async (req, res, next) => {
  try {
    const data = await Order.find();
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Orders are found",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const getOrderDetails = async (req, res, next) => {
  try {
    const { email, id } = req.query;
    const data = await Order.findOne(
      { email: email } && { _id: new ObjectId(id) },
    );
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Order found",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const updateDeliveryStatus = async (req, res, next) => {
  try {
    const updateField = {
      deliveryStatus: req.body.deliveryStatus,
    };
    const data = await findOneAndUpdate(
      { email: req.body.email } && { _id: new ObjectId(req.body.id) },
      { $set: updateField },
      { returnDocument: "after" },
    );
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Order Updated Successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const monthlyOrder = async (req, res, next) => {
  try {
    const monthlyOrder = await Order.aggregate([
      {
        $project: {
          month: { $month: "createdAt" },
          year: { $year: "createdAt" },
        },
      },
      {
        $group: {
          _id: { month: "$month", year: "$year" },
          totalOrders: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ]);
    return res.json(monthlyOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const monthlyAddedProduct = async (req, res, next) => {
  try {
    const addedProducts = await Product.aggregate([
      {
        $project: {
          month: { $month: "createdAt" },
          year: { $year: "year" },
        },
      },
      {
        $group: {
          _id: { month: "$month", year: "$year" },
          totalProducts: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.month": 1, "_id.year": 1 },
      },
    ]);
    return res.json(addedProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addOrder,
  getOrderList,
  getOrderDetails,
  updateDeliveryStatus,
  monthlyOrder,
  monthlyAddedProduct,
  adminGetOrders,
  successPayment,
};
