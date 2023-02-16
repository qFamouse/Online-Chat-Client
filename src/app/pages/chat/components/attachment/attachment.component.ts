import { Component, Input } from "@angular/core";
import { apiAttachmentRoutes } from "../../../../shared/constants/api-routes";
import { Attachment } from "../../../../shared/models/dto/attachment.dto";

@Component({
	selector: "app-attachment",
	templateUrl: "./attachment.component.html",
	styleUrls: ["./attachment.component.scss"]
})
export class AttachmentComponent {
	@Input() attachment: Attachment = {} as Attachment;

	getSrc() {
		return `${apiAttachmentRoutes.getById}/${this.attachment.id}`;
	}
}
