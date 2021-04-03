import Token from '../models/Token';
import User from '../models/User';

class TokenController {

  async post(request, response) {
    try {

      const { id } = request.body;

      const user = await User.findByPk(id);

      if (!user) {
        return response.status(404).json({ error: 'Usuário não encontrado' });
      }
      const token = await Token.findOne({ where: { user_id: id } });

      if (token) {
        return response.status(401).json({ error: 'não autorizado' });
      }

      const tokenCreated = await Token.create({ user_id: id });
      return response.json(tokenCreated);
            
    } catch (err) {
      return res.send(err.message);
    }
  }

  async getAll(request, response) {
    try {

      const token = await Token.findAll();

      return response.json(token);
    } catch (err) {
      return res.send(err.message);
    }
  }
}


export default new TokenController();