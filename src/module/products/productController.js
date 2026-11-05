const ApiError = require("../../error/handleApiError");
const productService = require("./productService");
const { paginationField, pick } = require("../../app/shared/helper");

const addProduct = async (req, res, next) => {
  try {
    const result = await productService.addProduct(req.body);
    if (result) {
      return res.status(201).json({
        success: true,
        statusCode: 201,
        message: `${result.length} Product added successfully!`,
        data: result,
      });
    } else {
      throw ApiError(401, "Can't add new product");
    }
  } catch (error) {
    next(error);
  }
};
const addAllProduct = async (req, res, next) => {
  try {
    const result = await productService.addAllProduct(req.body);
    if (result) {
      return res.status(201).json({
        success: true,
        statusCode: 201,
        message: `${result.length} Products added successfully!`,
        data: result,
      });
    } else {
      throw ApiError(401, "Can't add new product");
    }
  } catch (error) {
    next(error);
  }
};

const getAllProduct = async (req, res, next) => {
  const paginationOptions = pick(req.query, paginationField);
  try {
    const products = await productService.getProduct(paginationOptions);
    if (products) {
      return res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Product fetched successfully",
        data: products,
      });
    } else {
      throw new ApiError(400, "Can't fetch product");
    }
  } catch (error) {
    next(error);
  }
};

const productUpdate = async (req, res, next) => {
  try {
    const result = await productService.productUpdate(req.body);
    if (result) {
      return res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Product updated successfully",
        data: result,
      });
    } else {
      throw new ApiError(400, "Can't update product");
    }
  } catch (error) {
    next(error);
  }
};

const getTopSold = async (req, res, next) => {
  try {
    const top = await productService.getTopSold();
    res.status(200).json({
      success: true,
      message: "Top selling products fetched!",
      data: top,
    });
  } catch (error) {
    next(error);
  }
};

const search = async (req, res, next) => {
  const { searchKeyword, brand, category } = req.query;
  try {
    const result = await productService.search({
      searchKeyword: searchKeyword,
      brandFilter: brand ? brand.split(" ") : [],
      categoryFilter: category ? category.split(" ") : [],
    });
    if (!result)
      throw new ApiError(400, "There is a problem retrieving product");
    res.status(200).json({
      success: true,
      message: "Search product retrieve successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getRelatedProduct = async (req, res, next) => {
  const { category } = req.query;
  try {
    const result = await productService.relatedProducts(category);
    res.status(200).json({
      success: true,
      message: "Related products retrieved successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const result = await productService.getProductById(productId);
    res.status(200).json({
      success: true,
      message: "Product retrieved successful!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteProductById = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const result = await productService.deleteProductById(productId);
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  addProduct,
  addAllProduct,
  getAllProduct,
  productUpdate,
  getTopSold,
  search,
  getRelatedProduct,
  getProductById,
  deleteProductById,
};
