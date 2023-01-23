import { Injectable } from "@angular/core";
import { ApiService } from "../../../services/api.service";
import { apiDirectMessageRoutes } from "../../../constants/api-routes";
import { Observable } from "rxjs";
import { Interlocutor } from "../../../models/dto/interlocutor.dto";
import { Message } from "../../../models/dto/message.dto";
import { HttpParams } from "@angular/common/http";

@Injectable({
	providedIn: "root"
})
export class DirectMessageService {
	constructor(private apiService: ApiService) {}

	getInterlocutors(): Observable<Interlocutor[]> {
		const url = apiDirectMessageRoutes.interlocutors;
		return this.apiService.get(url);
	}

	getChat(userId: number): Observable<Message[]> {
		const url = apiDirectMessageRoutes.chat;
		const params = new HttpParams().set("userId", userId);
		return this.apiService.get(url, params);
	}
}
