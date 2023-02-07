import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ApiService } from "./services/api.service";
import { FileSizePipe } from "./pipes/file-size.pipe";

@NgModule({
	declarations: [FileSizePipe],
	imports: [CommonModule],
	exports: [FileSizePipe],
	providers: [ApiService]
})
export class SharedModule {}
