import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from 'src/schemas/user.schema';
import { LoginUserDto } from 'src/users/dto/login-user.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService,
    ) {}

    async login(data: LoginUserDto) {
        const user = await this.userModel.findOne({email: data.email});

        if(!user){
            throw new UnauthorizedException('Invalid email or password');
        }

        if(!user.isActive) {
            throw new UnauthorizedException("Your account is blocked. Please contact admin.");
        }

        const isPasswordMatch = await bcrypt.compare(
            data.password,
            user.password,
        );

        if(!isPasswordMatch){
            throw new UnauthorizedException('Invalid email or password');
        }

        const payload = {
            userId: user._id,
            role: user.role,
        };

        const accessToken = this.jwtService.sign(payload);

        return {
            message: 'Login Successful',
            accessToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        };
    }
}
