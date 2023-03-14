import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './elements/header/header.component';
import { FooterComponent } from './elements/footer/footer.component';
import { MainComponent } from './main/main.component';
import { CharsListComponent } from './characters/chars-list/chars-list.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthInterceptor } from './authentication/auth-interceptor';
import { AuthService } from './authentication/auth.service';
import { SpinnerComponent } from './elements/spinner/spinner.component';
import { CharsMainComponent } from './characters/chars-main/chars-main.component';
import { CharsMainService } from './characters/chars-main/chars-main.service';
import { SpinnerService } from './elements/spinner/spinner.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    HeaderComponent,
    FooterComponent,
    SpinnerComponent,

    MainComponent,
    CharsListComponent,
    CharsMainComponent,

  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthService,
    CharsMainService,
    SpinnerService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
