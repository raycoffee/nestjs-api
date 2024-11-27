import { Controller, Post, Get, Body, ParseIntPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Request } from "@nestjs/common";
import { AuthDto } from "./dto";

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }

    @Post('signup')
    signup(@Body() dto: AuthDto) {
        console.log(dto)
        return this.authService.signup()
    }

    @Post('login')
    login() {
        return this.authService.login()
    }
}