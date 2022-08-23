const { users } = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');

module.exports = {

    logIn(req, res) {
        let { email, password } = req.body;
        users.findOne({
            where: {
                email: email
            }
        }).then(user => {
            if (!user) {
                res.status(404).json({ message: "User not found" });
            } else {
                if (bcrypt.compareSync(password, user.password)) {
                    
                    // token
                    let token = jwt.sign({ user: user }, authConfig.secret, {
                        expiresIn: authConfig.expires
                    });
                    res.json({
                        message: "Login, Welcome Back",
                        //user: user,
                        token: token
                    })
                } else {
                    // Unauthorized Access Password
                    res.status(401).json({ message: "incorrect password" });
                }
            }
        }).catch(err => {
            res.status(500).json(err);
        })
    },

    Register(req, res) {
        let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));
        //console.log("here");

        users.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            email: req.body.email,
            password: password 
        }).then(user => {

            // Create token
            let token = jwt.sign({ user: user }, authConfig.secret, {
                expiresIn: authConfig.expires
            });
            res.json({
                message: "Register, You are new",
                user: user,
                token: token
            });
        }).catch(err => {
            res.status(500).json(err);
        });
    },

    deleteUser(req, res) {
        let _id = req.users.user.id;

        users.findOne({
            where: {
                id: _id
            }
        }).then(user => {
            if (!user) {
                res.status(404).json({ message: "User not found to delete" });
            } else {
                user.destroy().then(user => {
                    res.status(200).json({ message: "User deleted" });
                })
            }
        }).catch(err => {
            res.status(500).json(err);
        })
    },

    updateUser(req, res) {
        let _id = req.users.user.id;

        users.findOne({
            where: {
                id: _id
            }
        }).then(user => {
            if (!user) {
                res.status(404).json({ message: "User not found to update" });
            } else {
                user.first_name = req.body.first_name
                user.last_name = req.body.last_name

                user.save().then(user => {
                    res.status(200).json({ message: "User Updated", user });
                })
            }
        }).catch(err => {
            res.status(500).json(err);
        })
    },

    findUser(req, res) {
        
        let _id = req.users.user.id;
        
        users.findOne({
            where: {
                id: _id
            }
        }).then(user => {
            if (!user) {
                res.status(404).json({ message: "User not Found" });
            } else {
                res.status(200).json({ message: "User Found", user });
                
            }
        }).catch(err => {
            res.status(500).json(err);
        })
    },

    async showUsers(req, res) {
        let showUsers = await users.findAll();
        res.json(showUsers)
    },  
    
}