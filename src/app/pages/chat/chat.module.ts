import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { DirectComponent } from "./components/direct/direct.component";
import { AutosizeModule } from "ngx-autosize";
import { MessageComponent } from "./components/message/message.component";
import { DialogComponent } from "./components/dialog/dialog.component";
import { ConversationComponent } from "./components/conversation/conversation.component";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../shared/shared.module";
import {
	CdkContextMenuTrigger,
	CdkMenu,
	CdkMenuItem,
	CdkMenuTrigger
} from "@angular/cdk/menu";
import { AttachmentComponent } from './components/attachment/attachment.component';
import { PdfViewerModule } from "ng2-pdf-viewer";

@NgModule({
	imports: [
		CommonModule,
		RouterOutlet,
		AutosizeModule,
		ReactiveFormsModule,
		SharedModule,
		CdkMenuTrigger,
		CdkMenuItem,
		CdkMenu,
		CdkContextMenuTrigger,
		PdfViewerModule
	],
	declarations: [
		DirectComponent,
		MessageComponent,
		DialogComponent,
		ConversationComponent,
		AttachmentComponent
	]
})
export class ChatModule {}
