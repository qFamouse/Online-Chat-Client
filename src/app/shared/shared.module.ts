import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ApiService } from "./services/api.service";
import { FileSizePipe } from "./pipes/file-size.pipe";
import { SecurePipe } from "./pipes/secure.pipe";

@NgModule({
	declarations: [FileSizePipe, SecurePipe],
	imports: [CommonModule],
	exports: [FileSizePipe, SecurePipe],
	providers: [ApiService]
})
export class SharedModule {}
