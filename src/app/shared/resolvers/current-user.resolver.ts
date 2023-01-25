import { Injectable } from "@angular/core";
import {
	Resolve,
	RouterStateSnapshot,
	ActivatedRouteSnapshot
} from "@angular/router";
import { catchError, Observable, of } from "rxjs";
import { UserService } from "../modules/api/services/user.service";

@Injectable({
	providedIn: "root"
})
export class CurrentUserResolver implements Resolve<boolean> {
	constructor(private userService: UserService) {}

	resolve(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> {
		return this.userService.currentUser().pipe(catchError(err => of(err)));
	}
}
