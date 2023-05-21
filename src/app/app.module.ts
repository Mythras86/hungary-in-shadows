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
import { SpinnerComponent } from './elements/spinner/spinner.component';
import { CharsMainComponent } from './characters/chars-main/chars-main.component';
import { DetailsComponent } from './characters/chars-main/chars-subforms/details/details.component';
import { ResourcesComponent } from './characters/chars-main/chars-subforms/resources/resources.component';
import { SectionHeadComponent } from './elements/section-head/section-head.component';
import { ModalWrapperComponent } from './elements/modals/modal-wrapper.component';
import { AttributesComponent } from './characters/chars-main/chars-subforms//attributes/attributes.component';
import { LevelcontrolComponent } from './elements/modals/levelcontrol//levelcontrol.component';
import { InputModalComponent } from './elements/modals/input-modal/input-modal.component';

@NgModule({
  declarations: [
    AppComponent,

    AuthenticationComponent,
    HeaderComponent,
    FooterComponent,
    SpinnerComponent,
    SectionHeadComponent,

    ModalWrapperComponent,
    InputModalComponent,
    LevelcontrolComponent,

    MainComponent,
    CharsListComponent,
    CharsMainComponent,
    DetailsComponent,
    ResourcesComponent,
    AttributesComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],

  bootstrap: [AppComponent]
, exports: [AttributesComponent]})
export class AppModule { }
