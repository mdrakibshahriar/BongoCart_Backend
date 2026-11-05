const ApiError = require("../../error/handleApiError");
const Products = require("./productModel");
const { calculatePagination } = require("../../app/shared/helper");

const addProduct = async (product) => {
  const productExist = await Products.findOne({
    productName: product.productName,
  });
  if (productExist) {
    throw new ApiError(400, "Same product already exists!");
  }
  const newProduct = Products.create(product);
  if (!newProduct) {
    throw new ApiError(400, "Product add failed!");
  }
  return newProduct;
};

const addAllProduct = async (products) => {
  if (!Array.isArray(products) || products.length === 0) {
    throw new ApiError(400, "Please provide a non-empty array of products!");
  }
  const productNames = products.map((p) => p.productName);
  const existingProducts = await Products.find({
    productName: { $in: productNames },
  });
  if (existingProducts.length > 0) {
    const existingNames = existingProducts.map((p) => p.productName).join(", ");
    throw new ApiError(
      400,
      `The following products already exits: ${existingNames}`,
    );
  }

  const newProducts = await Products.insertMany(products);
  if (!newProducts || newProducts.length === 0) {
    throw new ApiError(400, "Product add failed!");
  }
  return newProducts;
};

const getProduct = async (paginationOptions) => {
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);
  const sortCondition = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }
  const products = await Products.find()
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await Products.countDocuments();
  if (products.length === 0) throw new ApiError(400, "There is no product");
  return {
    meta: {
      page,
      limit,
      total,
    },
    products,
  };
};

const productUpdate = async (product) => {
  const { id, _id, ...updateData } = product;
  if (!id) throw new ApiError(400, "Product Id required");
  const result = await Products.findByIdAndUpdate(
    id,
    {
      $set: updateData,
    },
    {
      returnDocument: "after",
      runValidators: true,
    },
  );
  if (!result) {
    throw new ApiError(400, "Product update failed!");
  }
  return result;
};

const getTopSold = async () => {
  return await Products.find().sort({ sales: -1 }).limit(12);
};

const search = async ({ searchKeyword, categoryFilter, brandFilter }) => {
  const searchCriteria = {};
  if (searchKeyword) {
    searchCriteria.$or = [
      { productName: { $regex: searchKeyword, $option: "i" } },
      { category: { $regex: searchKeyword, $option: "i" } },
    ];
  }
  if (categoryFilter.length && categoryFilter.length > 0) {
    searchCriteria.category = {
      $in: categoryFilter.map((category) => new RegExp(category, "i")),
    };
  }
  if (brandFilter.length && brandFilter.length > 0) {
    searchCriteria.brand = {
      $in: brandFilter.map((brand) => new RegExp(brand, "i")),
    };
  }
  const searchResult = await Products.find(searchCriteria);
  if (searchResult.length === 0) {
    throw new ApiError(400, "No matching product found!");
  }
  return searchResult;
};

const relatedProducts = async (category) => {
  const result = await Products.find({
    category: { $regex: category, $option: "i" },
  });
  if (result.length === 0) {
    throw new ApiError(400, "No matching product found!");
  }
  return result;
};

const getProductById = async (id) => {
  const product = await Products.find({ _id: id });
  if (!product) throw new ApiError(400, "Product not found!");
  return product;
};

const deleteProductById = async (id) => {
  const deleteRes = await Products.findByIdAndDelete(id);
  if (!deleteRes) throw new ApiError(400, "Product not found");
  return deleteRes;
};
module.exports = {
  addProduct,
  addAllProduct,
  productUpdate,
  getProduct,
  getTopSold,
  search,
  relatedProducts,
  getProductById,
  deleteProductById,
};
