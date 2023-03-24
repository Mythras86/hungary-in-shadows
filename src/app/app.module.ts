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
import { CharDetailsComponent } from './characters/chars-main/chars-subforms/details/details.component';
import { CharResourcesComponent } from './characters/chars-main/chars-subforms/resources/resources.component';
import { SectionHeadComponent } from './elements/section-head/section-head.component';
import { InputModalComponent } from './elements/input-modal/input-modal.component';
import { InputModalService } from './elements/input-modal/input-modal.service';
import { SectionHeadService } from './elements/section-head/section-head.service';

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
    CharDetailsComponent,
    CharResourcesComponent,
    SectionHeadComponent,
    InputModalComponent,

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
    SpinnerService,
    InputModalService,
    SectionHeadService,
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
