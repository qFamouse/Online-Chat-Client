import { Injectable } from "@angular/core";
import { JwtAuthService } from "../../../shared/services/jwt-auth.service";
import { SignupForm } from "../models/signup-form.model";
import { Observable, switchMap } from "rxjs";
import { LoginForm } from "../models/login-form.model";
import { JwtSession } from "../../../shared/models/dto/jwt-session.dto";

@Injectable({
	providedIn: "root"
})
export class AuthApiService {
	constructor(private jwtAuthService: JwtAuthService) {}

	signup(form: SignupForm): Observable<JwtSession> {
		return this.jwtAuthService
			.signup(form.userName, form.email, form.password)
			.pipe(
				switchMap(() => this.jwtAuthService.login(form.email, form.password))
			);
	}

	login(form: LoginForm): Observable<JwtSession> {
		return this.jwtAuthService.login(form.email, form.password);
	}
}
