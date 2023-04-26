import { Injectable } from "@angular/core";
import { JwtAuthService } from "../../../shared/services/jwt-auth.service";
import { SignupForm } from "../models/signup-form.model";
import { Observable, switchMap } from "rxjs";
import { LoginForm } from "../models/login-form.model";
import { AuthorizationDto } from "../../../shared/models/dto/authorization.dto";

@Injectable({
	providedIn: "root"
})
export class AuthApiService {
	constructor(private jwtAuthService: JwtAuthService) {}

	signup(form: SignupForm): Observable<AuthorizationDto> {
		return this.jwtAuthService
			.signup(form.userName, form.email, form.password)
			.pipe(
				switchMap(() => this.jwtAuthService.login(form.email, form.password))
			);
	}

	login(form: LoginForm): Observable<AuthorizationDto> {
		return this.jwtAuthService.login(form.email, form.password);
	}
}
