import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CharsComponent } from "./pages/chars/chars.component";
import { CreateCharComponent } from "./pages/chars/create-char/create-char.component";
import { MainComponent } from "./pages/main/main.component";
import { AuthGuard } from "./users/auth.guard";
import { LoginComponent } from "./users/login/login.component";
import { RegisterComponent } from "./users/register/register.component";


const routes: Routes = [
  { path: "", component: MainComponent, title: "Főoldal" },
  { path: "login", component: LoginComponent, title: "Belépés"},
  { path: "register", component: RegisterComponent, title: "Regisztráció"},

  { path: "chars", component: CharsComponent, title: "Karakterek"},
  { path: "newchar", component: CreateCharComponent, title: "Új karakter"},
  { path: "editchar/:charID", component: CreateCharComponent, title: "Új karakter"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
