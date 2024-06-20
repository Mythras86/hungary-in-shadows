import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { HideContentComponent } from './elements/hide-content/hide-content.component';
import { ModalWrapperComponent } from './elements/modals/modal-wrapper.component';
import { LevelcontrolComponent } from './elements/Inputs/levelcontrol/levelcontrol.component';
import { FieldTokeComponent } from './elements/Fields/field-toke/field-toke.component';
import { FieldKarmaComponent } from './elements/Fields/field-karma/field-karma.component';
import { InpDetailsComponent } from './elements/Inputs/inp-details/inp-details.component';
import { BtnOptionsComponent } from './elements/Buttons/btn-options/btn-options.component';
import { AttributesComponent } from './characters/attributes/attributes.component';
import { CharsMainComponent } from './characters/chars-main.component';
import { DetailsComponent } from './characters/details/details.component';
import { ItemsComponent } from './characters/items/items.component';
import { ResourcesComponent } from './characters/resources/resources.component';
import { SkillsComponent } from './characters/skills//skills.component';
import { StatusComponent } from './characters/status/status.component';
import { NpcsComponent } from './npcs/npcs.component';
import { InitiativeComponent } from './initiative/initiative.component';
import { StatusmonitorComponent } from './characters/status/statusmonitor/statusmonitor.component';
import { NewplayerComponent } from './initiative/newplayer/newplayer.component';
import { AttributeComponent } from './characters/attributes/attribute/attribute.component';
import { SkillComponent } from './characters/skills/skill/skill.component';
import { DetailComponent } from './characters/details/detail/detail.component';

@NgModule({
  declarations: [
    AppComponent,

    AuthenticationComponent,
    HeaderComponent,
    FooterComponent,
    SpinnerComponent,
    HideContentComponent,

    ModalWrapperComponent,
    LevelcontrolComponent,
    InpDetailsComponent,

    MainComponent,
    CharsListComponent,
    CharsMainComponent,
    AttributeComponent,
    AttributesComponent,
    DetailsComponent,
    ResourcesComponent,
    StatusComponent,
    SkillComponent,
    SkillsComponent,

    FieldKarmaComponent,
    FieldTokeComponent,
    BtnOptionsComponent,
    ItemsComponent,
    NpcsComponent,
    InitiativeComponent,
    StatusmonitorComponent,
    NewplayerComponent,
    DetailComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
