import * as Yup from 'yup';

import Shop from '../models/Shop';

class ShopController {
  async store(req, res) {
    const schema = Yup.object().shape({
      trade_name: Yup.string().required(),
      business_identification: Yup.string().required(),
      company_name: Yup.string().required(),
      address: Yup.string().required(),
      telephone: Yup.string().required(),
      legal_representative: Yup.string().required(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const shopExists = await Shop.findOne({
      where: { business_identification: req.body.business_identification },
    });

    if (shopExists) {
      return res
        .status(400)
        .json({ error: 'This business identification is already being used.' });
    }

    const {
      id,
      trade_name,
      business_identification,
      company_name,
      address,
      telephone,
      legal_representative,
    } = await Shop.create(req.body);

    return res.json({
      id,
      trade_name,
      business_identification,
      company_name,
      address,
      telephone,
      legal_representative,
    });
  }
}

export default new ShopController();
