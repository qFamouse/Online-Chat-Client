import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { DirectComponent } from "./components/direct/direct.component";
import { AutosizeModule } from "ngx-autosize";
import { MessageComponent } from "./components/message/message.component";
import { DialogComponent } from "./components/dialog/dialog.component";
import { ConversationComponent } from "./components/conversation/conversation.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
	imports: [CommonModule, RouterOutlet, AutosizeModule, ReactiveFormsModule],
	declarations: [
		DirectComponent,
		MessageComponent,
		DialogComponent,
		ConversationComponent
	]
})
export class ChatModule {}
