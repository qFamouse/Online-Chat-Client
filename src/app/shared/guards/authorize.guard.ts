import { Injectable } from "@angular/core";
import {
	ActivatedRouteSnapshot,
	CanActivate,
	RouterStateSnapshot
} from "@angular/router";
import { JwtAuthService } from "../services/jwt-auth.service";

@Injectable({
	providedIn: "root"
})
export class AuthorizeGuard implements CanActivate {
	constructor(private jwtAuthService: JwtAuthService) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean {
		return this.jwtAuthService.isAuthenticated();
	}
}
