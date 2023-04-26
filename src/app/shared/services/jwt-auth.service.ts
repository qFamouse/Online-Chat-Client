import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { catchError, map, Observable, of, tap } from "rxjs";
import { JWT_KEYS } from "../constants/storage";
import { apiUserRoutes } from "../constants/api-routes";
import { User } from "../models/entities/user.entity";
import { AuthorizationDto } from "../models/dto/authorization.dto";
import { TfaDto } from "../models/dto/tfa-dto";
import { AuthResponseDto } from "../models/dto/auth-response.dto";

@Injectable({
	providedIn: "root"
})
export class JwtAuthService {
	constructor(private apiService: ApiService) {}

	get token(): string {
		return localStorage.getItem(JWT_KEYS.token) ?? "";
	}

	isAuthenticated(): Observable<boolean> {
		let token = localStorage.getItem(JWT_KEYS.token);

		if (token != null) {
			const url = apiUserRoutes.authenticate;
			return this.apiService.get(url).pipe(
				map(res => true),
				catchError(err => of(false))
			);
		}

		return of(false);
	}
	login(email: string, password: string): Observable<AuthorizationDto> {
		const url = apiUserRoutes.login;
		return this.apiService
			.post<AuthorizationDto>(url, { email, password })
			.pipe(
				tap((res: AuthorizationDto) => this.setSession(res))
				// shareReplay()
			);
	}

	loginTfa(tfa: TfaDto): Observable<AuthResponseDto> {
		const url = apiUserRoutes.tfaLogin;
		return this.apiService.post<AuthResponseDto>(url, tfa).pipe(
			tap((res: AuthResponseDto) => {
				localStorage.setItem(JWT_KEYS.token, res.token);
			})
		);
	}

	signup(userName: string, email: string, password: string): Observable<User> {
		const url = apiUserRoutes.signup;
		return this.apiService.post(url, { userName, email, password });
	}

	logout() {
		localStorage.removeItem(JWT_KEYS.token);
	}

	private setSession(authorization: AuthorizationDto) {
		if (authorization.token) {
			localStorage.setItem(JWT_KEYS.token, authorization.token);
		}
	}
}
