
const express = require('express')
const router = express.Router()
const modelAccount = require('../models/User')
const userController = require('../controllers/controller');


// Déclaration de ma route par défaut http://localhost:3000
router.get('/', async (req, res) => {
    const users = await userController.getAllUsers();
    res.json(users)
})

router.get('/user', async (req, res) => {
    const { id } = req.body;
    const user = await userController.user({id});
    res.json(user)
})

router.post('/', async (req, res) => {
    const { username, email, password } = req.body;
    const user = await userController.addUser({ username, email, password });
    res.status(201).json(user);
});

router.put('/', async (req, res) => {
    const {password, username, email, id} = req.body;
    const user = await userController.updateUser({password, username, email, userId:id});
    res.json(user);
})

router.delete('/', async (req, res) => {
    const {id} = req.body;
    const user = await userController.deleteUser({id});
        res.json(user)
    })

module.exports = router