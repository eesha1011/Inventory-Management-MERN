import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<UserDocument>,
    ) {}

    async register(data: CreateUserDto) {
        const existingUser = await this.userModel.findOne({email: data.email});

        if(existingUser){
            throw new BadRequestException('Email already registered');
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = new this.userModel({
            name: data.name,
            email: data.email,
            password: hashedPassword,
            role: data.role || "User",
            isActive: true,
        });

        return user.save();
    }

    async findAllUsers() {
        return this.userModel.find().select("-password");
    }

    async updateUser(id: string, data: any) {
        return this.userModel.findByIdAndUpdate(id, data, {new: true});
    }

    async blockUser(id: string) {
        return this.userModel.findByIdAndUpdate(
            id,
            {isActive: false},
            {new: true},
        );
    }

    async unblockUser(id: string) {
        return this.userModel.findByIdAndUpdate(
            id,
            {isActive: true},
            {new: true},
        );
    }

    async deleteUser(id: string) {
        return await this.userModel.findByIdAndDelete(id);
    }
}
