import { Component } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { DetailsService } from '../details/details.service';
import { ResourcesService } from '../resources/resources.service';
import { SkillsService } from './skills.service';
import { ItemSelectService } from 'src/app/elements/item-select/item-select.service';
import { ModalService } from 'src/app/elements/modals/modal.service';
import { SelectSkillComponent } from './select-skill/select-skill.component';
import { AttributesService } from '../attributes/attributes.service';
import { SkillSpecFG } from './skills.model';
import { first } from 'rxjs';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {

  constructor(
    public s: SkillsService,
    public select: ItemSelectService,
    public resS: ResourcesService,
    private detailsS: DetailsService,
    public attrS: AttributesService,
    public modalS: ModalService,
  ) {
  }

  public get activeSkills(): FormArray | null | any {
    if(!this.s.skillsForm) {
      return null;
    }
    return this.s.skillsForm.controls['activeSkills'] as FormArray;
  }

  public get knowledgeSkills(): FormArray | null | any {
    if(!this.s.skillsForm) {
      return null;
    }
    return this.s.skillsForm.controls['knowledgeSkills'] as FormArray;
  }

  public get languageSkills(): FormArray | null | any {
    if(!this.s.skillsForm) {
      return null;
    }
    return this.s.skillsForm.controls['languageSkills'] as FormArray;
  }

  getSpecs(i: number): FormArray<SkillSpecFG> {
    const specs = ((this.s.skillsForm.get('activeSkills') as FormArray).at(i) as FormGroup).get('specs') as FormArray;
    return specs;
  }

  newSkill(): void {
    const ownedSkillsId: Array<string> = Object.values(this.activeSkills.controls).map((x:any) => x.value).map(x => x.id);
    this.modalS.openModal(SelectSkillComponent, {ownedSkillsId: ownedSkillsId, karma: this.resS.getSzabadKarma()}).subscribe(
      w => this.s.addSkill(w[0], w[1])
    );
  }

  anyanyelvChangeDetector(): void {
    const anyanyelv = this.detailsS.detailsForm.get('anyanyelv');
    anyanyelv?.valueChanges.pipe(first()).subscribe(() => this.s.addFirstLanguage(anyanyelv.value) );
  }

  ngOnInit(): void {
    this.anyanyelvChangeDetector()
  }

}
