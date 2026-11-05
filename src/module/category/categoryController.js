const Category = require("./categoryModel");

const addCategory = async (req, res, next) => {
  try {
    const category = req.body;
    category.category = category.category.toLoweCase();
    const result = await Category.create(category);
    if (!result) {
      return res.status(400).json({
        success: false,
        message: "Can't add category!",
      });
    }
    return res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Category added successfully!",
      data: result,
    });
  } catch (error) {
    if ((error.code = 11000 && error.keyPattern && error.keyValue)) {
      res.status(400).json({
        success: false,
        message: "Duplicate Category! This Category already exists!",
      });
    }
    next(error);
  }
};

const getCategory = async (req, res, next) => {
  try {
    const result = await Category.find();
    return res.status(200).json({
      success: true,
      message: "Category retrieved successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await Category.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Category deleted!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { addCategory, getCategory, deleteCategory };
