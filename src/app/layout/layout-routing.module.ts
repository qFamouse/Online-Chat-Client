import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LayoutComponent } from "./components/layout/layout.component";
import { chatPages } from "../shared/constants/pages";
import { DirectComponent } from "../pages/chat/components/direct/direct.component";
import { AuthorizeGuard } from "../shared/guards/authorize.guard";
import { CurrentUserResolver } from "../shared/resolvers/current-user.resolver";

const routes: Routes = [
	{
		path: "",
		component: LayoutComponent,
		children: [
			{
				path: chatPages.direct.name,
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
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class LayoutRoutingModule {}
