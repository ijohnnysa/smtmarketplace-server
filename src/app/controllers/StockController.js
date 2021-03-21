import * as Yup from 'yup';

import Stock from '../models/Stock';

class StockController {
  async store(req, res) {
    const schema = Yup.object().shape({
      amount: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const { id, amount } = req.body;

    const stock = await Stock.create({
      id,
      amount,
      product_id: req.params.id,
    });

    return res.json(stock);
  }

  async show(req, res) {
    const stock = await Stock.findOne({
      where: { product_id: req.params.id },
    });

    return res.json(stock);
  }
}

export default new StockController();
