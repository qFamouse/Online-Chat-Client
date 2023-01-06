import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { AuthComponent } from "./pages/auth/auth.component";
import { AppRoutingModule } from "./app-routing.module";

@NgModule({
	declarations: [AppComponent, AuthComponent],
	imports: [BrowserModule, AppRoutingModule],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
