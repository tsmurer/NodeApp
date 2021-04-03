const models = require('../models/');
const Stars = models.sequelize.models.Stars;
const Repositories = models.Repositories;
const Users = models.Users;

class StarsController {
    async findAll(req, res) {
        try {
            const { id } = req.params,
                stars = await Stars.findAll({ where: { RepositoryId: id } }),
                starUsernames = [];

            for(let i = 0; i < stars.length; i++) {
                let u = await Users.findOne({ where: {id: stars[i].UserId}});
                starUsernames.push(u.username);
            }

            const stars_object = {};
            stars_object["data"] = { 
                "stars": starUsernames
                };
            stars_object["stars_count"] = stars.length;
        
            return res.json(stars_object);
            
        } catch(err) {
            return res.send(err.message);
        }
    }

    async post(req, res) {
        try {
            const { id } = req.params,
             { starringUserId } = req.body // id do usuário atribuindo uma estrela

            const user = await Users.findOne({ where: {id: starringUserId} });
            const repository = await Repositories.findOne({ where: { id: id } });
        
            if (!user || !repository) {
              return res.status(404).json({ error: 'não encontrado' });
            }
    
            const star = await Stars.findOne({
              where: { UserId: starringUserId, RepositoryId: id },
            });
        
            if (star) {
              return res.status(401).json({ error: 'estrela já atribuída' });
            }
        
            const starCreated = await Stars.create({
              UserId: starringUserId,
              RepositoryId: id,
            });

            return res.json(starCreated);

        } catch (err) {
            return res.send(err.message);
        }
    }

    async delete(req , res) {
        try {
            const { unstarringId } = req.body;
            const { id } = req.params;

            const star = await Stars.findOne({ where: { UserId: unstarringId, RepositoryId: id } });
        
            if (!star) {
              return res.status(404).json({ error: 'Estrela não encontrada' });
            }

            await Stars.destroy({ where: { UserId: unstarringId, RepositoryId: id } });
        
            return res.json({ message: 'Estrela removida' });

        } catch (err) {
            return res.send(err.message);
        }
    }

}

export default new StarsController();