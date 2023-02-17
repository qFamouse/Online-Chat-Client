import { Component, Input, OnInit } from "@angular/core";
import { apiAttachmentRoutes } from "../../../../shared/constants/api-routes";
import { Attachment } from "../../../../shared/models/dto/attachment.dto";
import { JwtAuthService } from "../../../../shared/services/jwt-auth.service";
import { PDFSource } from "ng2-pdf-viewer";

@Component({
	selector: "app-attachment",
	templateUrl: "./attachment.component.html",
	styleUrls: ["./attachment.component.scss"]
})
export class AttachmentComponent implements OnInit {
	@Input() attachment: Attachment = {} as Attachment;
	pdfSource!: PDFSource;

	constructor(private jwtAuthService: JwtAuthService) {}

	getSrc(): string {
		return `${apiAttachmentRoutes.getById}/${this.attachment.id}`;
	}

	ngOnInit(): void {
		this.pdfSource = {
			url: `${apiAttachmentRoutes.getById}/${this.attachment.id}`,
			httpHeaders: {
				Authorization: `Bearer ${this.jwtAuthService.token}`
			}
		};
	}
}
