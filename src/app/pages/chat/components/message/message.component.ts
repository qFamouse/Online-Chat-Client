import { Component, Input } from "@angular/core";
import { Attachment } from "../../../../shared/models/dto/attachment.dto";
import { AttachmentService } from "../../../../shared/modules/api/services/attachment.service";

@Component({
	selector: "app-message",
	templateUrl: "./message.component.html",
	styleUrls: ["./message.component.scss"]
})
export class MessageComponent {
	@Input() text: string | undefined;
	@Input() time: string | undefined | null;
	@Input() isSender: boolean = false;
	@Input() attachments: Attachment[] = [];

	constructor(private attachmentService: AttachmentService) {}

	downloadAttachment(attachment: Attachment) {
		this.attachmentService.getById(attachment.id).subscribe(blob => {
			let link = document.createElement("a");
			link.href = window.URL.createObjectURL(blob);
			link.download = attachment.originalName;
			link.click();
		});
	}
}
