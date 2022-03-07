const router = require('express').Router()
const User = require('../models/User')

// Register
router.post('/register', async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        picture: req.body.picture
    })
    try {
        const user = await newUser.save()
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
})

//Login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            username: req.body.username,
            password: req.body.password
        })
        !user && res.status(404).json("User not found")
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
})

// //Get users
// router.get('/', async (req, res) => {
//     try {
//         const users = await User.find()
//         res.status(200).json(users)
//     } catch (error) {
//         res.status(500).json(error)
//     }
// })

//get a user
router.get("/", async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
        const user = userId
            ? await User.findById(userId)
            : await User.findOne({ username: username });
        const { password, updatedAt, ...other } = user._doc;
        res.status(200).json(other);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router