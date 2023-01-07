import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./pages/auth/auth.component";
import { NgModule } from "@angular/core";
import { DirectComponent } from "./pages/chat/components/direct/direct.component";

const routes: Routes = [
	{
		path: "",
		component: AuthComponent
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
