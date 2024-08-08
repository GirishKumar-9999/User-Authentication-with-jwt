const db = require("../models");
const User = db.user;

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    try {

        const emailUser = await User.findOne({ email: req.body.email });

        if (emailUser) {
            return res.status(400).send({ message: "Email already exists" });
        }

        const usernameUser = await User.findOne({ username: req.body.username });

        if (usernameUser) {
            return res.status(400).send({ message: "Username already exists" });
        }

        next();
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const signUp = {
    checkDuplicateUsernameOrEmail
};

module.exports = signUp;
