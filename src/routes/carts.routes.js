import { Router } from 'express';

import CartManager from '../dao/cart.dao.js';

const router = Router();
const cartManager = new CartManager();

router.post('/', async (req, res) => {
  try {
    const createdCart = await cartManager.createCart();
    res.status(201).json(createdCart);
  } catch {
    res.status(404).json({ status: 'Error', message: 'Error' });
  }
});

router.get('/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const findedProducts = await cartManager.getProductsByIdCart(cid);
    if (!findedProducts) {
      res
        .status(404)
        .json({ status: 'error', message: "this cart id doesn't exist" });
    }
    res.status(200).json(findedProducts);
  } catch {
    res.status(404).json({ status: 'Error', message: 'Error' });
  }
});

router.post('/:cid/products/:pid', async (req, res) => {
  try {
    const { cid } = req.params;
    const { pid } = req.params;
    const { quantity } = req.body;
    const newQuery = quantity ? quantity : 1;
    const response = await cartManager.pushProductInCart(cid, pid, newQuery);
    if (response.cart === false)
      return res
        .status(404)
        .json({ status: 'Error', message: 'no existe el carro' });
    if (response.product === false)
      return res
        .status(404)
        .json({ status: 'Error', message: 'no existe el producto' });
    res.status(201).json(response);
  } catch {
    res.status(404).json({ status: 'Error', message: 'error' });
  }
});

router.delete('/:cid/products/:pid', async (req, res) => {
  try {
    const { cid } = req.params;
    const { pid } = req.params;
    const { quantity } = req.body;
    const newQuery = quantity ? quantity : 1;
    const response = await cartManager.deleteProductById(cid, pid, newQuery);
    if (response.cart === false)
      return res
        .status(404)
        .json({ status: 'Error', message: 'no existe el carro' });
    if (response.product === false)
      return res.status(404).json({
        status: 'Error',
        message: 'no existe el producto en el carro',
      });
    res.status(200).json(response);
  } catch {
    res.status(404).json({ status: 'Error', message: 'error' });
  }
});

router.put('/:cid/products/:pid', async (req, res) => {
  try {
    const { cid } = req.params;
    const { pid } = req.params;
    const { quantity } = req.body;
    const newQuery = quantity ? quantity : 1;
    const response = await cartManager.updateProductsByQuantity(
      cid,
      pid,
      newQuery
    );
    if (response.cart === false)
      return res
        .status(404)
        .json({ status: 'Error', message: 'no existe el carro' });
    if (response.product === false)
      return res.status(404).json({
        status: 'Error',
        message: 'no existe el producto en el carro',
      });
    res.status(201).json(response);
  } catch {
    res.status(404).json({ status: 'Error', message: 'error' });
  }
});

router.delete('/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const findedCart = await cartManager.deleteAllProducts(cid);
    if (findedCart.cart === false) {
      res
        .status(404)
        .json({ status: 'error', message: "this cart id doesn't exist" });
    }
    res.status(200).json(findedCart);
  } catch {
    res.status(404).json({ status: 'Error', message: 'Error' });
  }
});

export default router;
