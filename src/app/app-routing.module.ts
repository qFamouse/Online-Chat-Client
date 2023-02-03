import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { DirectComponent } from "./pages/chat/components/direct/direct.component";
import { AuthPageComponent } from "./pages/auth/components/auth-page/auth-page.component";
import { AuthorizeGuard } from "./shared/guards/authorize.guard";
import { authPages, chatPages } from "./shared/constants/pages";
import { CurrentUserResolver } from "./shared/resolvers/current-user.resolver";

const routes: Routes = [
	{
		path: "",
		pathMatch: "prefix",
		redirectTo: authPages.auth.absolutePath
	},
	{
		path: authPages.auth.absolutePath,
		component: AuthPageComponent
	},
	{
		path: chatPages.direct.absolutePath,
		component: DirectComponent,
		canActivate: [AuthorizeGuard],
		resolve: { currentUser: CurrentUserResolver }
	},
	{
		path: `${chatPages.direct.absolutePath}/:id`,
		component: DirectComponent,
		canActivate: [AuthorizeGuard],
		resolve: { currentUser: CurrentUserResolver }
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
