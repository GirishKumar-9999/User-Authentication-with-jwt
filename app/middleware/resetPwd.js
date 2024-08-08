const db = require("../models");
const User = db.user;

const checkIfUserExists = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) {
            return res.status(400).send({ message: "User not found" });
        }

        next();
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const validateNewAndConfirmPassword = async (req, res, next) => {
    try {
        if (req.body.newPassword != req.body.confirmPassword) {
            return res.status(400).send({ message: "New Password and Confirm Password don't match" });
        }

        next();
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const resetpwd = {
    checkIfUserExists,
    validateNewAndConfirmPassword
};

module.exports = resetpwd;