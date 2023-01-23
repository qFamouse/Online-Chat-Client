import { Injectable } from "@angular/core";
import { ApiService } from "../../../services/api.service";
import { Observable } from "rxjs";
import { apiUserRoutes } from "../../../constants/api-routes";
import { User } from "../../../models/entities/user.entity";

@Injectable({
	providedIn: "root"
})
export class UserService {
	constructor(private apiService: ApiService) {}

	getUserById(id: number): Observable<User> {
		let url = `${apiUserRoutes.user}/${id}`;
		return this.apiService.get(url);
	}
}
