import slugify from 'slugify';
const models = require('../models/');
const Stars = models.sequelize.models.Stars;
const Repositories = models.Repositories;
const Users = models.Users;

class RepositoriesController {
    async findAll(req, res) {
        try {
            const { username } = req.params,
              user = await Users.findOne({where: {username: username}}),
              repository = await Repositories.findAll({ where: { UserId: user.id } });
            //   stars = await Stars.findAll({ where: { RepositoryId: id } }),
            //   starUsernames = [];

            // for(let i = 0; i < stars.length; i++) {
            //     let u = await Users.findOne({ where: {id: stars[i].UserId}});
            //     starUsernames.push(u.username);
            // }
        
            if (!repository) {
            return res.status(404).json({ error: 'Repositório não encontrado' });
            }

            const repository_object = {}
            repository_object["data"] = repository;
            repository_object["count"] = repository.length;
        
            return res.json(repository_object);
        } catch(err) {
            return res.send(err.message);
        }
    }

    async get(req, res) {
        try {

        } catch (err) {
            return res.send(err.message);
        }
    }

    async post(req, res) {
        try {

            const { name, description, is_public } = await req.body;
            const { username } = await req.params;

            const user = await Users.findOne({ where: { username: username } });
        
            if (!user) {
              return res.status(404).json({ error: 'Usuário não encontrado' });
            }
        
            const slug = slugify(`${username}${name}`);
        
            const repositoryCreated = await Repositories.create({
              UserId: user.id,
              name,
              local: user.local,
              description,
              is_public,
              slug,
            });
            return res.json(repositoryCreated);

        } catch (err) {
            return res.send(err.message);
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;

            const repository = await Repositories.findOne({ where: { id } });
        
            if (!repository) {
              return res.status(404).json({ error: 'Repositório não encontrado' });
            }
        
            const { name, description, is_public } = await req.body;
        
            const nameCheck = await Repositories.findOne({
              where: { UserId: repository.UserId, name: req.body.name },
            });
        
            if (nameCheck) {
              return res.status(401).json({ error: 'O usuário já tem um repositório com o nome escolhido' });
            }
        
            const user = await Users.findOne({
              where: { id: repository.UserId },
            });
        
            if (!user) {
              return res.status(404).json({ error: 'not found' });
            }
        
            const slug = slugify(`${user.name}-${req.body.name}`);
        
            const { active } = await repository.update({
              UserId: repository.UserId,
              name,
              description,
              is_public: is_public,
              slug,
            });
        
            return res.json(repository);

        } catch (err) {
            return res.send(err.message);
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;

            const repository = await Repositories.findOne({
              where: { id },
            });
        
            if (!repository) {
              return res.status(404).json({ error: 'Repositório não encontrado' });
            }
            await Repositories.destroy({
              where: { id },
            });
        
            return res.json({ message: 'Repositorório apagado' });

        } catch (err) {
            return res.send(err.message);
        }
    }

}

export default new RepositoriesController();