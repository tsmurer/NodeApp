import Token from '../models/Token';
import User from '../models/User';

class TokenController {

  async post(request, response) {
    const { id } = request.body;

    const user = await User.findByPk(id);

    if (!user) {
      return response.status(404).json({ error: 'User not found' });
    }
    const token = await Token.findOne({ where: { user_id: id } });

    if (token) {
      return response.status(401).json({ error: 'not authorized' });
    }

    const tokenCreated = await Token.create({ user_id: id });
    return response.json(tokenCreated);
  }

  async getAll(request, response) {
    const token = await Token.findAll();

    return response.json(token);
  }
}



export default new TokenController();