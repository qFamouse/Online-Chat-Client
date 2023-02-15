import { Component } from "@angular/core";
import { authPages, chatPages } from "../../../shared/constants/pages";
import { JwtAuthService } from "../../../shared/services/jwt-auth.service";

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

	constructor(public jwtAuthService: JwtAuthService) {}
}
