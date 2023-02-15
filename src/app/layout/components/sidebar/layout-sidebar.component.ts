import { Component } from "@angular/core";
import { authPages, chatPages } from "../../../shared/constants/pages";
import { JwtAuthService } from "../../../shared/services/jwt-auth.service";
import { DirectMessageService } from "../../../shared/modules/api/services/direct-message.service";
import { take } from "rxjs";

@Component({
	selector: "app-layout-sidebar",
	templateUrl: "./layout-sidebar.component.html",
	styleUrls: ["./layout-sidebar.component.scss"]
})
export class LayoutSidebarComponent {
	matRippleColor: string = "rgba(30, 39, 51, 0.35)";
	matRippleRadius: number = 60;
	directPage = chatPages.direct.absolutePath;
	authPage = authPages.auth.absolutePath;

	constructor(
		public jwtAuthService: JwtAuthService,
		public directMessageService: DirectMessageService
	) {}

	downloadStatistics() {
		this.directMessageService
			.getStatistics()
			.pipe(take(1))
			.subscribe(blob => {
				let link = document.createElement("a");
				link.href = window.URL.createObjectURL(blob);
				link.download = "statistics";
				link.click();
			});
	}
}
