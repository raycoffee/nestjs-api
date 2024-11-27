import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/user/user.entity";

@Injectable({})

export class AuthService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>) {

    }

    login() {
        return 'Login successful.'
    }

    signup() {
        return { response: "Signup successful." }
    }
}