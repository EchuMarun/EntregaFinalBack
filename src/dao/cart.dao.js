import cartModel from '../dao/models/cart.model.js';
import ProductManager from '../dao/product.dao.js';

const productManager = new ProductManager();

export default class CartManager {
  async createCart() {
    try {
      const newCart = await cartModel.create({});
      console.log('console de la respuesta', newCart);
      return newCart;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }
  async getProductsByIdCart(cid) {
    try {
      const cart = await cartModel.findById(cid).populate('products.product');
      if (!cart) return null;
      return cart.products;
    } catch (error) {
      console.error('Error:', error);
    }
  }
  async pushProductInCart(cid, pid, newQuery) {
    try {
      const cart = await cartModel.findById(cid);
      if (!cart) return { cart: false };
      const product = await productManager.getProductById(pid);
      if (!product) return { product: false };
      const productInCart = cart.products.find(p => p.product == pid);
      if (!productInCart) {
        cart.products.push({ product: pid, quantity: newQuery });
      } else {
        productInCart.quantity += newQuery;
      }
      cart.save();
      return cart;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async deleteProductById(cid, pid, newQuery) {
    try {
      const cart = await cartModel.findById(cid);
      if (!cart) return { cart: false };
      const findedProduct = cart.products.find(p => p.product == pid);
      if (!findedProduct) return { product: false };
      if (newQuery === 1) {
        cart.products = cart.products.find(p => p.product != pid);
      } else {
        if (findedProduct.quantity > newQuery) {
          findedProduct.quantity -= newQuery;
        } else {
          cart.products = cart.products.find(p => p.product != pid);
        }
      }
      cart.save();
      return cart;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async updateProductsByQuantity(cid, pid, newQuery) {
    try {
      const cart = await cartModel.findById(cid);
      if (!cart) return { cart: false };
      const findedProduct = cart.products.find(p => p.product == pid);
      if (!findedProduct) return { product: false };
      findedProduct.quantity = newQuery;
      cart.save();
      return cart;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async deleteAllProducts(cid) {
    try {
      const cart = await cartModel.findById(cid);
      if (!cart) return { cart: false };
      cart.products = [];
      cart.save();
      return cart;
    } catch (error) {
      console.error(`Error:${error}`);
    }
  }
}
