const User = require('../models/user');
const jwt = require('jsonwebtoken');    
require('dotenv').config();


const VerifyEmail = async (req, res) => {
    const { id } = req.query;
    const data = jwt.verify(id, process.env.JWT_SECRET);
    
    if (!data) {
        return res.status(400).json({ msg: 'Invalid token' });
    }
    try {
        const user = await User.findOne({ where: { id: data.id } });
        if (user.isAuthenticated) {
            return res.status(400).json({ msg: 'User already authenticated' });
        }
        if (!user) {
            return res.status(400).json({ msg: 'Invalid token' });
        }
        user.isAuthenticated = true;
        await user.save();
        res.status(200).json({ msg: 'User authenticated' });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports = { VerifyEmail };