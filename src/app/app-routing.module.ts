import {RouterModule, Routes} from "@angular/router";
import {AuthComponent} from "./pages/auth/auth.component";
import {NgModule} from "@angular/core";

const routes: Routes = [
    {
        path: '',
        component: AuthComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
