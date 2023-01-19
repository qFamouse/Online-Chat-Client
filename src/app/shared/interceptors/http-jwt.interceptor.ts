import { Injectable } from "@angular/core";
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor
} from "@angular/common/http";
import { Observable } from "rxjs";
import { JWT_KEYS } from "../constants/storage";

@Injectable()
export class HttpJwtInterceptor implements HttpInterceptor {
	constructor() {}

	intercept(
		request: HttpRequest<unknown>,
		next: HttpHandler
	): Observable<HttpEvent<unknown>> {
		const token = localStorage.getItem(JWT_KEYS.token);
		if (token) {
			request = request.clone({
				headers: request.headers.set("Authorization", `Bearer ${token}`)
			});
		}

		return next.handle(request);
	}
}
