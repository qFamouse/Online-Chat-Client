import { Provider } from "@angular/core";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpJwtInterceptor } from "../interceptors/http-jwt.interceptor";

export const interceptorsProvider: Provider[] = [
	{
		provide: HTTP_INTERCEPTORS,
		useClass: HttpJwtInterceptor,
		multi: true
	}
];
