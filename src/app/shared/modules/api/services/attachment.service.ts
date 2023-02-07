import { Injectable } from "@angular/core";
import { ApiService } from "../../../services/api.service";
import { apiAttachmentRoutes } from "../../../constants/api-routes";
import { Observable } from "rxjs";

@Injectable({
	providedIn: "root"
})
export class AttachmentService {
	constructor(private apiService: ApiService) {}

	getById(id: number): Observable<Blob> {
		const url = `${apiAttachmentRoutes.getById}/${id}`;
		return this.apiService.getBlob(url);
	}
}
