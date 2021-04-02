const Followers = require('../models/').Followers;
const Followings = require('../models/').Followings;

//follow, unfollow e ver todos os followers/followings
class FollowsController {

    async findAllFollowers(req, res) {
        try {
        } catch(err) {
            return res.send(err.message);
        }
    }

    async findAllFollowings(req, res) {
        try {
        } catch(err) {
            return res.send(err.message);
        }
    }


    async post(re, res) { //follow
        try {

        } catch (err) {
            return res.send(err.message);
        }
    }

    async delete(req , res) { //unfollow
        try {

        } catch (err) {
            return res.send(err.message);
        }
    }

}

export default new FollowsController();