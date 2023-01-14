import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Observable, shareReplay, tap } from "rxjs";
import { JwtSession } from "../models/dto/jwt-session.dto";
import { JWT_KEYS } from "../constants/storage";
import { apiUserRoutes } from "../constants/api-routes";
import { User } from "../models/entities/user.entity";

@Injectable({
	providedIn: "root"
})
export class JwtAuthService {
	constructor(private apiService: ApiService) {}

	isAuthenticated(): boolean {
		let token = localStorage.getItem(JWT_KEYS.token);
		return token != null && token.length > 0;
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
		return this.apiService.post(url, { name: userName, email, password });
	}

	logout() {
		localStorage.removeItem(JWT_KEYS.token);
		localStorage.removeItem(JWT_KEYS.expires);
	}

	private setSession(jwt: JwtSession) {
		localStorage.setItem(JWT_KEYS.token, jwt.token);
		localStorage.setItem(JWT_KEYS.expires, jwt.expires);
	}
}
