import { productModel } from './models/product.model.js';

export default class ProductManager {
  async getProducts(query, filter) {
    try {
      const products = await productModel.paginate(query, filter);
      return products;
    } catch (error) {
      console.error(error);
    }
  }

  async getProductById(id) {
    try {
      const product = await productModel.findById(id);
      if (!product) return { product: false };
      return product;
    } catch (error) {
      console.error(error);
    }
  }

  async newProduct(product) {
    try {
      const newProduct = await productModel.create(product);
      return newProduct;
    } catch (error) {
      console.error(error);
    }
  }

  async updateProduct(id, updates) {
    try {
      const product = await productModel.findById(id);
      if (!product) return { product: false };
      const updatedProduct = await productModel.findByIdAndUpdate(id, updates, {
        new: true,
      });
      return updatedProduct;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteProduct(id) {
    try {
      const product = await productModel.findById(id);
      if (!product)
        return { product: null, message: `el producto ${id} no se encontro` };
      const updateProduct = await productModel.findByIdAndUpdate(
        id,
        { status: false },
        { new: true }
      );
      return `el producto ${id} se elimino correctamente`;
    } catch (error) {
      console.error(error);
    }
  }
}
