import { Injectable } from "@angular/core";
import {
	Resolve,
	RouterStateSnapshot,
	ActivatedRouteSnapshot
} from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "../modules/api/services/user.service";
import { User } from "../models/entities/user.entity";

@Injectable({
	providedIn: "root"
})
export class CurrentUserResolver implements Resolve<User> {
	constructor(private userService: UserService) {}

	resolve(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<User> {
		return this.userService.currentUser();
	}
}
