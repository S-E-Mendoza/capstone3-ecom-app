import express from 'express';
import Product from '../models/productModel.js';
import data from '../data.js';
import User from '../models/userModel.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  await Product.removeAllListeners({});
  const createdProducts = await Product.insertMany(data.products);
  await User.removeAllListeners({});
  const createdUsers = await User.insertMany(data.users);
  res.send({ createdProducts, createdUsers });
});

seedRouter.delete('/del', async (req, res) => {
  await Product.deleteMany({});
  await User.deleteMany({});
  res.status(200).send({ message: 'Data Deleted' });
});
export default seedRouter;
