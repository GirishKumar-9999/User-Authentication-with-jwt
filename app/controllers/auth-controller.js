const config = require("../config/auth-config");
const db = require("../models");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
    try {
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
        });
        await user.save();

        res.send({ message: "User was registered successfully!" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.signin = async (req, res) => {

    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }

        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({ message: "Invalid Password!" });
        }

        const token = jwt.sign({ id: user.id },
            config.secret,
            {
                algorithm: 'HS256',
                allowInsecureKeySizes: true,
                expiresIn: 86400, // 24 hours
            });

        req.session.token = token;

        res.status(200).send({
            id: user._id,
            username: user.username,
            email: user.email,
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.signout = async (req, res) => {
    try {
        req.session = null;
        return res.status(200).send({ message: "You've been signed out!" });
    } catch (err) {
        this.next(err);
    }
};

exports.reset_password = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) {
            return res.status(404).send({ message: "User Not found" });
        }

        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({ message: "Invalid Password!" });
        }

        user.password = bcrypt.hashSync(req.body.newPassword, 8);

        await user.save();

        res.status(200).send({
            id: user._id,
            username: user.username,
            email: user.email,
            message: "Password has been successfully reset."
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};
