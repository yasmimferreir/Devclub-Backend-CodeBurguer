import { v4 } from 'uuid';

import * as Yup from 'yup';

import User from '../models/User';

class UserController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email(),
      passwordHash: Yup.string().required().min(6),
      admin: Yup.boolean(),
    });

    const { name, email, passwordHash, admin } = request.body;

    const user = await User.create({
      id: v4(),
      name,
      email,
      passwordHash,
      admin,
    });

    return response.status(201).json({ id: user.id, name, email, admin });
  }
}

export default new UserController();
