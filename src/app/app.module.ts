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
import { ArmorsComponent } from './characters/items/armors/armors.component';
import { ArtifactsComponent } from './characters/items/artifacts/artifacts.component';
import { CybersComponent } from './characters/items/cybers/cybers.component';
import { ExplosivesComponent } from './characters/items/explosives/explosives.component';
import { ItemsComponent } from './characters/items/items.component';
import { SpellsComponent } from './characters/items/spells/spells.component';
import { SpiritsComponent } from './characters/items/spirits/spirits.component';
import { ToolsComponent } from './characters/items/tools/tools.component';
import { WeaponsComponent } from './characters/items/weapons/weapons.component';
import { ResourcesComponent } from './characters/resources/resources.component';
import { SkillsListComponent } from './characters/skills/skills-list/skills-list.component';
import { SkillsSelectComponent } from './characters/skills/skills-select/skills-select.component';
import { SkillsComponent } from './characters/skills/skills.component';
import { StatusComponent } from './characters/status/status.component';

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
    AttributesComponent,
    DetailsComponent,
    ResourcesComponent,
    StatusComponent,
    SkillsComponent,

    FieldKarmaComponent,
    FieldTokeComponent,
    BtnOptionsComponent,
    ItemsComponent,
    SkillsListComponent,
    SkillsSelectComponent,
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
