import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
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
import { LevelcontrolComponent } from './elements/levelcontrol/levelcontrol.component';
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
import { SelectSkillComponent } from './characters/skills/select-skill/select-skill.component';
import { SelectSkillSpecComponent } from './characters/skills/select-skill-spec/select-skill-spec.component';
import { SkillspecComponent } from './characters/skills/skillspec/skillspec.component';
import { SelectItemComponent } from './characters/items/select-item/select-item.component';
import { ItemComponent } from './characters/items/item/item.component';
import { SpecialFieldComponent } from './elements/special-field/special-field.component';
import { FloatingMenuComponent } from './elements/floating-menu/floating-menu.component';
import { SpiritComponent } from './characters/items/spirit/spirit.component';

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
    BtnOptionsComponent,
    ItemsComponent,
    NpcsComponent,
    InitiativeComponent,
    StatusmonitorComponent,
    NewplayerComponent,
    DetailComponent,
    SelectSkillComponent,
    SelectSkillSpecComponent,
    SkillspecComponent,
    SelectItemComponent,
    ItemComponent,
    SpecialFieldComponent,
    FloatingMenuComponent,
    SpiritComponent,
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideHttpClient(withInterceptorsFromDi()),
  ]
})

export class AppModule { }
