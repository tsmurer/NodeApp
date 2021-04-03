const models = require('../models');
const Users = models.Users;
const Follows = models.sequelize.models.Follows;

//follow, unfollow e ver todos os followers/followings
class FollowsController {

    async findAll(req, res) {

        try {
            const { username } = req.params,
                user = await Users.findOne({where: {username: username}}),
                followers = await Follows.findAll({ where: { UserId: user.id } }),
                followings = await Follows.findAll({ where: { FollowingId: user.id } }),
                followersUsernames = [],
                followingsUsernames = []
            
            for(let i = 0; i < followers.length; i++) {
                let u = await Users.findOne({ where: {id: followers[i].FollowingId}});
                followersUsernames.push(u.username);
            }

            for(let i = 0; i < followings.length; i++) {
                let u = await Users.findOne({ where: {id: followings[i].UserId}});
                followingsUsernames.push(u.username);
            }
            
            const follows_object = {}
            follows_object["data"] = { 
                "followers": followersUsernames, 
                "followings": followingsUsernames
                };
            follows_object["followers_count"] = followers.length;
            follows_object["followings_count"] = followings.length;
        
            return res.json(follows_object);
        } catch(err) {
            return res.send(err.message);
        }
    }

    async post(req, res) { //follow
        try {
            const { toFollowId } = req.body;
            const { username } = req.params;
            const user = await Users.findOne({where: {username: username}});
            const userId = user.id;

            if (userId === toFollowId) {
              return res.status(401).json({ error: 'não é possível seguir a si mesmo' });
            }
        
            const follower = await Users.findOne({
              where: { id: toFollowId },
            });

            const following = await Users.findOne({
                where: { id: userId },
              });
        
            if (!follower || !following) {
              return res.status(404).json({ error: 'usuário não encontrado' });
            }
        
            const followcheck = await Follows.findOne({
              where: { FollowingId: userId, UserId: toFollowId },
            });
        
            if (followcheck) {
              return res.status(401).json({ error: 'relação já existente' });
            }
        
            const followCreated = await Follows.create({
              FollowingId: userId,
              UserId: toFollowId,
            });
            return res.json(followCreated);

        } catch (err) {
            return res.send(err.message);
        }
    }

    async unfollow(req , res) { //unfollow
        try {
            const { unfollowId } = req.body;
            const { username } = req.params;
            const user = await Users.findOne({where: {username: username}});
            const userId = user.id;

            const follow = await Follows.findOne({
              where: { UserId: userId, FollowingId: unfollowId },
            });
        
            if (!follow) {
              return res.status(404).json({ error: 'Follow não encontrado' });
            }
            await Follows.destroy({
              where: { UserId: userId, FollowingId: unfollowId },
            });
        
            return res.json({ message: 'Unfollow com sucesso' });

        } catch (err) {
            return res.send(err.message);
        }
    }

}

export default new FollowsController();