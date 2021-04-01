const Users = require('../models/').Users;

class UserController {

    //get 1
  async get(req, res) {
    const { username } = req.params;

    const user = await Users.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const { id, name, email, local, avatar, bio } = user;

    return res.json({
      id,
      name,
      email,
      local,
      avatar,
      bio,
    });
  }

  // get todos
  async findAll(req, res) {
    const user = await Users.findAll();

    return res.json(user);
  }

  // post
  async post(req, res) {
    try {

    const { name, email, local, avatar, username, bio } = req.body;

    const check_email = await Users.findOne({ where: { email } });
    const check_username = await Users.findOne({ where: { username } });

    if (check_email || check_username) {
      return res.status(401).json({ error: 'email e/ou usuário já existente' });
    }


    const { id } = await Users.create({
        name,
        email,
        local,
        avatar,
        username,
        bio,
    });
    return res.json({
      id,
      name,
      email,
      local,
      avatar,
      username,
      bio,
    });
    } catch (err){
        return res.send(err.message);
    }
  }

}

export default new UserController();