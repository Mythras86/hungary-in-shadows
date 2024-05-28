import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./authentication/auth.guard";
import { AuthenticationComponent } from "./authentication/authentication.component";
import { CharsListComponent } from "./characters/chars-list/chars-list.component";
import { MainComponent } from "./main/main.component";
import { NpcsComponent } from "./npcs/npcs.component";
import { CharsMainComponent } from "./characters/chars-main.component";
import { InitiativeComponent } from "./initiative/initiative.component";


const routes: Routes = [
  { path: "", component: MainComponent, title: "Főoldal" },
  { path: "auth", component: AuthenticationComponent, title: "Azonosítás"},

  { path: "charslist", component: CharsListComponent, title: "Karakterek"},
  { path: "npcs", component: NpcsComponent, title: "Nem Játékosok"},
  { path: "initiative", component: InitiativeComponent, title: "Kezdeményezés"},

  { path: "newchar", component: CharsMainComponent, title: "Új karakter"},
  { path: "editchar/:_id", component: CharsMainComponent, title: "Karakter szerkesztés", canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
