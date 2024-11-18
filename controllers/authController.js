const jwt = require('jsonwebtoken');
const {User} = require('../models/db');
const bcrypt = require("bcrypt");

async function register(req, res){
    const {username, email, password} = req.body;
    if (!username||!email||!password){
        return res.status(400).json({error: "You should fill all fields"})
    }
    if (User != null){
        const existingEmail = await User.findOne({where:  {email: req.body.email}});
        if (existingEmail){
            return res.status(400).json({error: "Email is already taken"});
        }
        const existingUsername = await User.findOne({where:  {username: req.body.username}});
        if (existingUsername){
            return res.status(400).json({error: "Username is already taken"});
        }
    }
    // Хэшируем пароль
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({username: username, email: email, password: hashedPassword});
    const token = jwt.sign({id: newUser.id, username: newUser.username}, process.env.JWT_SECRET, {expiresIn: '1h'});
    return res.status(201).json({message: 'User registered successfully', token: token});
}
async function login(req, res){
    const {email, password} = req.body;
    const user = await User.findOne({where: {email: email}});
    if (!user){
        return res.status(404).json({error: 'User not found'});
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch){
        return res.status(400).json({error: 'Invalid credentials'});
    }
    const token = jwt.sign({id: user.id, username: user.username}, process.env.JWT_SECRET, {expiresIn: '1h'});
    return res.status(200).json({message: 'Login successful', token:token});
}
module.exports = {register, login};