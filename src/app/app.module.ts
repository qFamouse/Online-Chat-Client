import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ChatModule } from "./pages/chat/chat.module";
import { AuthModule } from "./pages/auth/auth.module";
import { interceptorsProvider } from "./shared/providers/interceptors.provider";
import { LayoutModule } from "./layout/layout.module";

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		FormsModule,
		AuthModule,
		ChatModule,
		LayoutModule
	],
	providers: [...interceptorsProvider],
	bootstrap: [AppComponent]
})
export class AppModule {}
