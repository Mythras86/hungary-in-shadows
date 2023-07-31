import { Component, OnInit } from '@angular/core';
import { SpellsService } from './spells.service';
import { ResourcesService } from '../resources/resources.service';
import { LevelcontrolService } from 'src/app/elements/modals/levelcontrol/levelcontrol.service';
import { FormArray } from '@angular/forms';
import { SelectSpellService } from 'src/app/elements/modals/select-spells/select-spells.service';
import { AttributesService } from '../attributes/attributes.service';

@Component({
  selector: 'app-spells',
  templateUrl: './spells.component.html',
  styleUrls: ['./spells.component.css']
})
export class SpellsComponent implements OnInit {
  constructor(
    public spellsServ: SpellsService,
    public resServ: ResourcesService,
    public attrServ: AttributesService,
    public sSpellServ: SelectSpellService,
    public lvlContServ: LevelcontrolService,
  ) { }

  public get spells(): FormArray | null | any {
    if(!this.spellsServ.spellsForm) {
      return null;
    }
    return this.spellsServ.spellsForm.controls['spells'] as FormArray;
  }

  getCsoportok():Array<any> {
    const form = (this.spellsServ.spellsForm.get('spells') as FormArray);
    const csoportArr = Object.values(form.controls).map(x => x.value).map(x => x.csoport);
    const csopArrUniq = [...new Set(csoportArr.map(x=> x))];
    return csopArrUniq;
  }

  getControls() {
    const controls = (this.spellsServ.spellsForm.get('spells') as FormArray).controls;
    return controls;
  }

  ngOnInit(): void {
    this.spellsServ.createSpells();
  }
}
