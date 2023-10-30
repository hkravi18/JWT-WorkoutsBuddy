const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: '2h' });
};

//login 
const loginUser = async(req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        
        //create a token 
        const token = createToken(user._id);

        res.status(200).json({email, token, id: user._id, username: user.username});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
    // res.json({ msg: 'login' });
};

//signup
const signupUser = async(req, res) => {
    const { email, password, username } = req.body;

    try {
        const user = await User.signup(email, password, username);
        
        //create a token 
        const token = createToken(user._id);

        res.status(200).json({email, token, id: user._id, username: user.username});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    // res.json({ msg: 'signup' });
};

module.exports = { signupUser, loginUser };