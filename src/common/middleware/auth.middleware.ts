import * as jwt from "jsonwebtoken";

import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const authenticationHeader = req.headers.authorization;
        const token = authenticationHeader && authenticationHeader.split(' ')[1];

        if (!token) throw new HttpException('UnAuthorized', HttpStatus.UNAUTHORIZED);

        jwt.verify(token, process.env.JWT_ACCESS_SECRET, (error, user) => {
            if (error) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
            req['user'] = user;
            next();

        })
    }
}