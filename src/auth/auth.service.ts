import { Injectable, ForbiddenException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/user/user.entity";
import { AuthDto } from "./dto";
import * as argon from "argon2"
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from '@nestjs/config';

@Injectable({})

export class AuthService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>, private jwt: JwtService, private config: ConfigService) {

    }

    async signup(dto: AuthDto) {
        const { email, password, } = dto
        const hash = await argon.hash(password)

        try {
            const user = this.userRepository.create({
                email,
                password: hash
            })

            const savedUser = await this.userRepository.save(user)
            return this.signToken(savedUser.id, savedUser.email)
        } catch (error) {

            if (error.code === '23505') {
                throw new ForbiddenException('Email already taken');
            }


            console.error('Signup error:', error);
            throw new ForbiddenException('Error during signup');
        }

    }

    async login(dto: AuthDto) {
        const { email, password } = dto
        const user = await this.userRepository.findOne({ where: { email } })
        if (!user) {
            throw new ForbiddenException('Credentials incorrect');
        }

        const pwMatches = await argon.verify(user.password, password)

        if (!pwMatches) {
            throw new ForbiddenException('Credentials incorrect');
        }

        return this.signToken(user.id, user.email)
    }

    async signToken(userId: number, email: string): Promise<{ access_token: string }> {
        const payload = {
            sub: userId,
            email
        }

        const token = await this.jwt.signAsync(payload, {
            expiresIn: "15m",
            secret: this.config.get('JWT_SECRET')
        })

        return {
            access_token: token
        }
    }

}