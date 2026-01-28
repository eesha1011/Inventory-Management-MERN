import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('register')
    register(@Body() body:CreateUserDto){
        return this.usersService.register(body);
    }

    @Get()
    getAllUsers() {
        return this.usersService.findAllUsers();
    }

    @Patch("block/:id")
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('Admin')
    blockUser(@Param('id') id: string) {
        return this.usersService.blockUser(id);
    }

    @Patch("unblock/:id")
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('Admin')
    unblockUser(@Param('id') id: string) {
        return this.usersService.unblockUser(id);
    }
}

