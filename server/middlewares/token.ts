const jwt = require("jsonwebtoken");
const secret = require("../config/auth.config");
import { Response, NextFunction } from 'express';

module.exports = function (req: any, res: Response, next: NextFunction) {
    const token: string = <string>req.headers["auth-token"];
    if (!token) {
        return res.status(401).send({ message: "Unauthorized. Access denied." });
    }

    try {
        const verified = jwt.verify(token, secret);
        req.user = verified;
        next();
    }
    catch (err) {
        res.status(400).send('Invalid token.');
    }
};
