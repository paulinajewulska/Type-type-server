const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import { secret } from "../config/auth.config";
import { db, UserDoc } from "../models/index";
const User: mongoose.Model<UserDoc> = db.user;

exports.register = async (req: Request, res: Response) => {
    const emailExist: UserDoc = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("Email already exist");

    const usernameExist: UserDoc = await User.findOne({ username: req.body.username });
    if (usernameExist) return res.status(400).send("Username already exist");

    const salt: number = await bcrypt.genSalt(10);
    const hashPassword: string = await bcrypt.hash(req.body.password, salt);

    const user: UserDoc = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashPassword
    });

    try {
        const savedUser: UserDoc = await user.save();
        res.send({ user: savedUser._id });
    }
    catch (err) {
        res.status(400).send(err);
    }
}

exports.login = async (req: Request, res: Response) => {
    let user: UserDoc;
    if (req.body.email) {
        user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send("Email doesn't exist.");
    }

    if (req.body.username) {
        user = await User.findOne({ username: req.body.username });
        if (!user) return res.status(400).send("Username doesn't exist.");
    }

    const validPassword: boolean = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid password.');

    const token: string = jwt.sign({ _id: user._id }, secret);
    res.header('auth-token', token).send('Logged in.');
}