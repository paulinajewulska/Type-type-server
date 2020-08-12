const { validationResult } = require('express-validator');
import { Request, Response, NextFunction } from 'express';

exports.checkValidation = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.mapped()
        });
    }
    next();
};