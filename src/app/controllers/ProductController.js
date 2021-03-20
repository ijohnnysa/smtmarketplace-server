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
}

export default new ProductController();
