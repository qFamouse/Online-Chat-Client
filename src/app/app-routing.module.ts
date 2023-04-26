import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { AuthPageComponent } from "./pages/auth/components/auth-page/auth-page.component";
import { authPages } from "./shared/constants/pages";
import { TfaPageComponent } from "./pages/auth/components/tfa-page/tfa-page.component";

const routes: Routes = [
	{
		path: "",
		pathMatch: "full",
		redirectTo: authPages.auth.name
	},
	{
		path: authPages.auth.absolutePath,
		component: AuthPageComponent
	},
	{
		path: authPages.tfa.absolutePath,
		component: TfaPageComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
