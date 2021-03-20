import * as Yup from 'yup';
import jwt from 'jsonwebtoken';

import Shop from '../models/Shop';

import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      business_identification: Yup.string().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const { business_identification, password } = req.body;

    const shop = await Shop.findOne({
      where: { business_identification },
    });

    if (!shop) {
      return res
        .status(401)
        .json({ error: 'Business identification was not found.' });
    }

    if (!(await shop.checkPassword(password))) {
      return res.status(401).json({ error: 'The password does not match.' });
    }

    const {
      id,
      trade_name,
      company_name,
      address,
      telephone,
      legal_representative,
    } = shop;

    return res.json({
      shop: {
        id,
        trade_name,
        business_identification,
        company_name,
        address,
        telephone,
        legal_representative,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
