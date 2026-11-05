const Brand = require("./brandModel");

const addBrand = async (req, res, next) => {
  try {
    const brand = req.body;
    brand.brand = brand.brand.toLowerCase();
    const result = await Brand.create(brand);
    if (!result) {
      return res.status(400).json({
        success: false,
        message: "Brand not added",
      });
    }
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Brand added successfully",
      data: result,
    });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyValue) {
      return res.status(400).json({
        success: false,
        message: "Duplicate Brand! This Brand already exists!",
      });
    }
    next(error);
  }
};

const getBrand = async (req, res, next) => {
  try {
    const brand = await Brand.find();
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Brand list found",
      data: brand,
    });
  } catch (error) {
    next(error);
  }
};

const deleteBrand = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await Brand.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Brand deleted",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addBrand,
  getBrand,
  deleteBrand,
};
