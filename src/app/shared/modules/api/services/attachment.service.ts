import { Injectable } from "@angular/core";
import { ApiService } from "../../../services/api.service";
import { apiAttachmentRoutes } from "../../../constants/api-routes";
import { Observable } from "rxjs";
import { Attachment } from "../../../models/dto/attachment.dto";

@Injectable({
	providedIn: "root"
})
export class AttachmentService {
	constructor(private apiService: ApiService) {}

	getById(id: number): Observable<Blob> {
		const url = `${apiAttachmentRoutes.getById}/${id}`;
		return this.apiService.getBlob(url);
	}

	uploadToDirectMessageByMessageId(
		id: number,
		files: File[]
	): Observable<Attachment[]> {
		const formData = new FormData();
		formData.append("messageId", id.toString());
		files.forEach(file => {
			formData.append("files", file);
		});

		const url = `${apiAttachmentRoutes.uploadToDirectMessageByMessageId}`;
		return this.apiService.postBlob(url, formData);
	}
}
