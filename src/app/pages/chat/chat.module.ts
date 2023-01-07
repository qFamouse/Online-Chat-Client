import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { DirectComponent } from './components/direct/direct.component';

@NgModule({
	imports: [CommonModule, RouterOutlet],
	declarations: [
   DirectComponent
	]
})
export class ChatModule {}
