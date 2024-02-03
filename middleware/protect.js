const User = require('../models/user');

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
        return res.status(401).json({ msg: 'Not authorized, no token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
        const user =  await User.findOne({ where: { id : decoded.id } }).select('-password');
        if(!user) {
            return res.status(401).json({ msg: 'Unauthorized request' });
        } else {
            req.user = user;
            next(); 
        }
    } catch (err) {
        if (err.name === 'JsonWebTokenError' && err.message === 'jwt malformed') {
            return res.status(401).json({ msg: 'Malformed token. Please provide a valid token.' });
        }
        return res.status(401).json({ msg: 'Not authorized, token failed' });
    }
}

module.exports = {
    protect
}