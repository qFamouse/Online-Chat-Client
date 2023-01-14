import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { DirectComponent } from "./pages/chat/components/direct/direct.component";
import { AuthPageComponent } from "./pages/auth/components/auth-page/auth-page.component";

const routes: Routes = [
	{
		path: "",
		component: AuthPageComponent
	},
	{
		path: "direct",
		component: DirectComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
