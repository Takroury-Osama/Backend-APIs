const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController')
const authorize = require('./../middleware/authorize')

router.get('/', (req, res) => {
    res.json({hello: 'World!'});
  })

  router.post('/api/register', AuthController.Register);
  router.post('/api/login', AuthController.logIn);

  router.get('/api/users', authorize, AuthController.findUser);
  router.put('/api/users', authorize, AuthController.updateUser);
  router.delete('/api/users', authorize, AuthController.deleteUser);

  //For test all data
  router.get('/api/alltestusers', AuthController.showUsers);





  module.exports = router;