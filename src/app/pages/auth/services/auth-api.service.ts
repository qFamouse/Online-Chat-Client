import { Injectable } from "@angular/core";
import { JwtAuthService } from "../../../shared/services/jwt-auth.service";
import { SignupForm } from "../models/signup-form.model";
import { Observable, tap } from "rxjs";
import { User } from "../../../shared/models/entities/user.entity";
import { LoginForm } from "../models/login-form.model";
import { JwtSession } from "../../../shared/models/dto/jwt-session.dto";

@Injectable({
	providedIn: "root"
})
export class AuthApiService {
	constructor(private jwtAuthService: JwtAuthService) {}

	signup(form: SignupForm): Observable<User> {
		return this.jwtAuthService
			.signup(form.userName, form.email, form.password)
			.pipe(
				tap(user => this.jwtAuthService.login(form.email, form.password))
				// for avatar create second request, and use switchMap (for synchronize)
				//switchMap(() => this.jwtAuthService.login(form.email, form.password))
				//switchMap(updateImage)
			);
	}

	login(form: LoginForm): Observable<JwtSession> {
		return this.jwtAuthService.login(form.email, form.password);
	}
}
