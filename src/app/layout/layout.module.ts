import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LayoutComponent } from "./components/layout/layout.component";
import { LayoutRoutingModule } from "./layout-routing.module";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { LayoutSidebarComponent } from "./components/sidebar/layout-sidebar.component";
import { AutosizeModule } from "ngx-autosize";
import { MatRippleModule } from "@angular/material/core";

@NgModule({
	declarations: [LayoutSidebarComponent, LayoutComponent],
	imports: [
		CommonModule,
		LayoutRoutingModule,
		MatIconModule,
		MatButtonModule,
		AutosizeModule,
		MatRippleModule
	],
	bootstrap: [LayoutComponent]
})
export class LayoutModule {}
