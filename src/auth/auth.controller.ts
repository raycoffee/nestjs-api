import { Controller, Post, Get, Body, ParseIntPipe, HttpCode, HttpStatus } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Request } from "@nestjs/common";
import { AuthDto } from "./dto";

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }

    @Post('signup')
    signup(@Body() dto: AuthDto) {

        return this.authService.signup(dto)
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() dto: AuthDto) {
        return this.authService.login(dto)
    }
}