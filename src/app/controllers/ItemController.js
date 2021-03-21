import Product from '../models/Product';
import Shop from '../models/Shop';

class ItemController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const items = await Product.findAll({
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'title', 'price', 'image_path', 'image_url'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: Shop,
          as: 'shop',
          attributes: ['trade_name'],
        },
      ],
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

export default new ItemController();
