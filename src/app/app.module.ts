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
import { CharsMainComponent } from './characters/chars-main/chars-main.component';
import { DetailsComponent } from './characters/chars-subforms/details/details.component';
import { ResourcesComponent } from './characters/chars-subforms/resources/resources.component';
import { HideContentComponent } from './elements/hide-content/hide-content.component';
import { ModalWrapperComponent } from './elements/modals/modal-wrapper.component';
import { LevelcontrolComponent } from './elements/modals/levelcontrol//levelcontrol.component';
import { InputModalComponent } from './elements/modals/input-modal/input-modal.component';
import { StatusComponent } from './characters/chars-subforms/status/status.component';
import { SkillsComponent } from './characters/chars-subforms/skills/skills.component';
import { SelectSkillsComponent } from './elements/modals/select-skills//select-skills.component';
import { AttributesComponent } from './characters/chars-subforms/attributes/attributes.component';
import { ArmorsComponent } from './characters/chars-subforms/armors/armors.component';
import { CybersComponent } from './characters/chars-subforms/cybers/cybers.component';
import { SpellsComponent } from './characters/chars-subforms/spells/spells.component';
import { ToolsComponent } from './characters/chars-subforms/tools/tools.component';
import { SelectArmorsComponent } from './elements/modals/select-armors/select-armors.component';
import { SelectCybersComponent } from './elements/modals/select-cybers/select-cybers.component';
import { SpiritsComponent } from './characters/chars-subforms/spirits/spirits.component';
import { ArtifactsComponent } from './characters/chars-subforms/artifacts/artifacts.component';
import { WeaponsComponent } from './characters/chars-subforms/weapons/weapons.component';
import { SelectArtifactsComponent } from './elements/modals/select-artifacts/select-artifacts.component';
import { SelectToolsComponent } from './elements/modals/select-tools/select-tools.component';
import { SelectSpellsComponent } from './elements/modals/select-spells/select-spells.component';
import { SelectWeaponsComponent } from './elements/modals/select-weapons/select-weapons.component';
import { SelectSpiritsComponent } from './elements/modals/select-spirits/select-spirits.component';
import { ExplosivesComponent } from './characters/chars-subforms/explosives/explosives.component';
import { SelectWAddonsComponent } from './elements/modals/select-wAddons/select-wAddons.component';
import { SelectAAddonsComponent } from './elements/modals/select-aAddons/select-aAddons.component';

@NgModule({
  declarations: [
    AppComponent,

    AuthenticationComponent,
    HeaderComponent,
    FooterComponent,
    SpinnerComponent,
    HideContentComponent,

    ModalWrapperComponent,
    InputModalComponent,
    LevelcontrolComponent,

    MainComponent,
    CharsListComponent,
    CharsMainComponent,
    AttributesComponent,
    DetailsComponent,
    ResourcesComponent,
    StatusComponent,
    SkillsComponent,
    ArmorsComponent,
    CybersComponent,
    SpellsComponent,
    ToolsComponent,
    SpiritsComponent,
    ArtifactsComponent,
    WeaponsComponent,
    ExplosivesComponent,

    SelectArmorsComponent,
    SelectArtifactsComponent,
    SelectCybersComponent,
    SelectSkillsComponent,
    SelectToolsComponent,
    SelectSpellsComponent,
    SelectWeaponsComponent,
    SelectSpiritsComponent,
    SelectWAddonsComponent,
    SelectAAddonsComponent
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
