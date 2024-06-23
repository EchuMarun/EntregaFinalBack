import { Router } from 'express';
import ProductManager from '../dao/product.dao.js';

const router = Router();

const productManager = new ProductManager();

router.get('/', async (req, res) => {
  try {
    const { page, limit, sort, category } = req.query;
    const filter = {
      page: page || 1,
      limit: limit || 10,
      sort: {
        price: sort === 'asc' ? 1 : -1,
      },
    };
    const query = { status: true };
    category ? (query.category = category) : null;
    const products = await productManager.getProducts(query, filter);
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ status: 'Error', message: 'Error' });
  }
});

router.get('/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productManager.getProductById(pid);
    if (product.product === false) {
      res
        .status(404)
        .json({ status: 'Error', message: 'El producto no existe' });
    } else {
      res.status(200).json(product);
    }
  } catch {
    res.status(404).json({ status: 'Error', message: 'Error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const product = req.body;
    const newProduct = await productManager.newProduct(product);
    res.status(201).json({
      status: 'success',
      message: `El producto ${newProduct.title} se agrego`,
    });
  } catch {
    res.status(404).json({ status: 'Error', message: 'Error' });
  }
});

router.put('/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const product = req.body;
    const updatedProduct = await productManager.updateProduct(pid, product);
    if (updatedProduct.product === false) {
      res
        .status(404)
        .json({ status: 'not Found', message: 'el producto no existe' });
    }
    res.status(200).json({ updatedProduct });
  } catch {
    res.status(404).json({ status: 'Error', message: 'Error' });
  }
});

router.delete('/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const deletedProduct = await productManager.deleteProduct(pid);
    if (deletedProduct.product === null) {
      res
        .status(404)
        .json({ status: 'not Found', message: deletedProduct.message });
    }
    res.status(200).json({
      status: 'success',
      message: deletedProduct,
    });
  } catch {
    res.status(404).json({ status: 'Error', message: 'Error' });
  }
});

export default router;
