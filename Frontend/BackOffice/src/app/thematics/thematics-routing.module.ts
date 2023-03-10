import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ThematicsComponent } from "./thematics.component";

const routes: Routes = [
    {path:'', component: ThematicsComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ThematicsRoutingModule{}