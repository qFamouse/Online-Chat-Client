import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { AuthPageComponent } from "./pages/auth/components/auth-page/auth-page.component";
import { authPages } from "./shared/constants/pages";

const routes: Routes = [
	{
		path: "",
		pathMatch: "full",
		redirectTo: authPages.auth.name
	},
	{
		path: authPages.auth.absolutePath,
		component: AuthPageComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
