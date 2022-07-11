import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './schema/user.schema';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';


@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private readonly UserModel: Model<UserDocument>) { }

  async signup(signupDto: SignupDto) {
    const hashedPassword = await bcrypt.hash(signupDto.password, 10);

    const userObj = new this.UserModel({ ...signupDto, password_hashed: hashedPassword });
    const user = await userObj.save();

    const access_token = jwt.sign(user.toJSON(), process.env.JWT_ACCESS_SECRET);
    return { user, access_token };
  }

  async signin(signinDto: SigninDto) {
    const { username, password } = signinDto;

    const user = await this.UserModel.findOne({ username });
    const isPasswordMatch = await bcrypt.compare(password, user.password_hashed);

    if (!isPasswordMatch) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

    const access_token = jwt.sign(user.toJSON(), process.env.JWT_ACCESS_SECRET);
    return { user, access_token };
  }
}
