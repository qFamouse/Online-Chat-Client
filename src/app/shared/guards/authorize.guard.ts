import { Injectable } from "@angular/core";
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot
} from "@angular/router";
import { JwtAuthService } from "../services/jwt-auth.service";
import { map, Observable } from "rxjs";

@Injectable({
	providedIn: "root"
})
export class AuthorizeGuard implements CanActivate {
	constructor(private jwtAuthService: JwtAuthService, private router: Router) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean | Observable<boolean> {
		return this.jwtAuthService.isAuthenticated().pipe(
			map(res => {
				if (!res) {
					this.router.navigateByUrl("");
				}
				return res;
			})
		);
	}
}
