import { Body, Controller, Post, Get } from '@nestjs/common';
import { AuthenticationService } from '../services/authentication.service';
import RegisterDto from '../dto/register.dto';

@Controller('authentication')
export class AuthenticationController {
    constructor (
        private readonly authenticationService: AuthenticationService
    ) { }

    @Get('getAllUsers') // http://localhost:3000/authentication/getAllUsers    
    async getAllUsers() {
        return this.authenticationService.getAllUsers();
    }

    @Post('register')
    async register(@Body() registrationData: RegisterDto) {
        return this.authenticationService.register(registrationData);
    }
}