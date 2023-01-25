import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { catchError, map, Observable, of, shareReplay, tap } from "rxjs";
import { JwtSession } from "../models/dto/jwt-session.dto";
import { JWT_KEYS } from "../constants/storage";
import { apiUserRoutes } from "../constants/api-routes";
import { User } from "../models/entities/user.entity";

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
	login(email: string, password: string): Observable<JwtSession> {
		const url = apiUserRoutes.login;
		return this.apiService.post(url, { email, password }).pipe(
			tap((res: any) => this.setSession(res)),
			shareReplay()
		);
	}

	signup(userName: string, email: string, password: string): Observable<User> {
		const url = apiUserRoutes.signup;
		return this.apiService.post(url, { userName, email, password });
	}

	logout() {
		localStorage.removeItem(JWT_KEYS.token);
		localStorage.removeItem(JWT_KEYS.expiration);
	}

	private setSession(jwt: JwtSession) {
		localStorage.setItem(JWT_KEYS.token, jwt.token);
		localStorage.setItem(JWT_KEYS.expiration, jwt.expires);
	}
}
