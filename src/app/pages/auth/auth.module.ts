import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthPageComponent } from "./components/auth-page/auth-page.component";
import { LoginFormComponent } from "./components/login-form/login-form.component";
import { SignupFormComponent } from "./components/signup-form/signup-form.component";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { DialogModule } from "../../shared/modules/dialog/dialog.module";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
	declarations: [AuthPageComponent, LoginFormComponent, SignupFormComponent],
	imports: [
		CommonModule,
		MatInputModule,
		ReactiveFormsModule,
		MatButtonModule,
		DialogModule,
		HttpClientModule
	],
	exports: [AuthPageComponent],
	providers: []
})
export class AuthModule {}
