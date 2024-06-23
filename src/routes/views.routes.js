import express from 'express';
import ProductManager from '../dao/product.dao.js';

const routes = express.Router();
const productManager = new ProductManager();

routes.get('/', async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render('home', { products });
  } catch {}
});

routes.get('/realtimeproducts', (req, res) => {
  res.render('realtimeproducts');
});

export default routes;
