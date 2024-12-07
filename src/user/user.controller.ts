import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JwtGuard } from '../auth/guard/index';
import { GetUser } from '../auth/decorator/index';
import { User } from './user.entity';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
    @Get('me')
    getMe(@GetUser() user: User, @GetUser('email') email: string) {
        return user 
    }

    // @Patch()
    // editUser() {

    // }
}
