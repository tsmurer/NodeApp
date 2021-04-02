const Users = require('../models/').Users;
const Repositories = require('../models/').Repositories;
const Token = require('../models').Token;


class UserController {

  async get(req, res) {
    const { username } = req.params;

    const user = await Users.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const { id, name, email, local, avatar, bio } = user;
    const repositories = await Repositories.findAll({ where: { UserId: user.id } });
    
    return res.json({
      id,
      name,
      email,
      local,
      avatar,
      bio,
      "repositories": repositories
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

    await Token.create({ user_id: id });
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

  //update
  async update(req, res) {
    try {
    const { id } = req.params;

    const user = await Users.findOne({ where: { id } });
    console.log(user);

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const { name, username, email, location, avatar, bio } = req.body;

    const emailAlreadyTaken = await Users.findOne({
      where: { email },
    });

    if (emailAlreadyTaken) {
      return res.status(401).json({ error: 'Não autorizado' });
    }

    const usernameAlreadyTaken = await Users.findOne({
      where: { email },
    });

    if (usernameAlreadyTaken) {
      return res.status(401).json({ error: 'not authorized' });
    }

    const { active } = await user.update({
      name,
      email,
      location,
      avatar,
      username,
      bio,
    });

    return res.json({
      name,
      email,
      location,
      avatar,
      username,
      bio,
    });
    }catch (err) {
      return res.send(err.message);
    }
  }

  async delete(req, res) {
      try {

        const { id } = req.params;

        const user = await Users.findOne({ where: { id } });

        if (!user) {
          return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        await Users.destroy({
          where: { id },
        });

        return res.json({ message: 'Usuário deletado' });
    } catch (err) {
      return res.send(err.message);
    }  
  }
}

export default new UserController();