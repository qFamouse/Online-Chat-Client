import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { DirectComponent } from "./components/direct/direct.component";
import { AutosizeModule } from "ngx-autosize";

@NgModule({
	imports: [CommonModule, RouterOutlet, AutosizeModule],
	declarations: [DirectComponent]
})
export class ChatModule {}
