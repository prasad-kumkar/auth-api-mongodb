const router = require('express').Router();
const User = require('../model/user')
const { registerValidation, loginValidation } = require("../validation")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config();


router.post('/register', async (req, res) => {

    const { error } = registerValidation(req.body)
    if (error) { return res.status(400).send(error.details[0].message) }

    const emailExist = await User.findOne({ email: req.body.email })
    if (emailExist) { return res.status(400).send("E-mail already exists") }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
    })
    try {
        const savedUser = await user.save()
        res.send(savedUser)
    } catch (err) {
        res.status(400).send(err)
    }
})


router.post("/login", async (req, res) => {
    const { error } = loginValidation(req.body)
    if (error) { return res.status(400).send(error.details[0].message) }

    //check if email exists in db
    const user = await User.findOne({ email: req.body.email })
    if (!user) { return res.status(400).send("E-mail does not exist") }

    //password
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) { return res.status(400).send("Invalid Password") }

    //create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send(token)

})


module.exports = router;