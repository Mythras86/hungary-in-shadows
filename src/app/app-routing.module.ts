import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SpinnerComponent } from "./elements/spinner/spinner.component";
import { CharsComponent } from "./pages/chars/chars.component";
import { MainComponent } from "./pages/main/main.component";
import { LoginComponent } from "./users/login/login.component";
import { RegisterComponent } from "./users/register/register.component";


const routes: Routes = [
  { path: "", component: MainComponent, title: "Főoldal" },
  { path: "login", component: LoginComponent, title: "Belépés"},
  { path: "register", component: RegisterComponent, title: "Regisztráció"},
  { path: "chars", component: CharsComponent, title: "Karakterek"},
  { path: "spinner", component: SpinnerComponent, title: "mindegy"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
