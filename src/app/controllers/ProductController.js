import * as Yup from 'yup';

import Product from '../models/Product';

class ProductController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const { id, title, price } = req.body;
    const { originalname: image, filename: image_path } = req.file;

    const product = await Product.create({
      id,
      title,
      price,
      image,
      image_path,
      shop_id: req.shopId,
    });

    return res.json(product);
  }

  async index(req, res) {
    const { page = 1 } = req.query;

    const items = await Product.findAll({
      where: { shop_id: req.shopId },
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'title', 'price', 'image_path', 'image_url'],
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json(items);
  }

  async show(req, res) {
    const { id } = req.params;

    const product = await Product.findOne({
      where: { id },
    });

    return res.json(product);
  }
}

export default new ProductController();
