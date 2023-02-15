import { Component } from "@angular/core";
import { chatPages } from "../../../shared/constants/pages";

@Component({
	selector: "app-layout-sidebar",
	templateUrl: "./layout-sidebar.component.html",
	styleUrls: ["./layout-sidebar.component.scss"]
})
export class LayoutSidebarComponent {
	matRippleColor: string = "rgba(30, 39, 51, 0.35)";
	matRippleRadius: number = 60;
	directPage = chatPages.direct.absolutePath;
}
