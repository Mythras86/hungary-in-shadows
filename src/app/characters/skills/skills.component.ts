import { Component } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { DetailsService } from '../details/details.service';
import { ResourcesService } from '../resources/resources.service';
import { SkillsService } from './skills.service';
import { ItemSelectService } from 'src/app/elements/item-select/item-select.service';
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
  ) {
  }

  getSpecs(i: number): FormArray<SkillSpecFG> {
    const specs = ((this.s.skillsForm.get('activeSkills') as FormArray).at(i) as FormGroup).get('specs') as FormArray;
    return specs;
  }

  anyanyelvChangeDetector(): void {
    const anyanyelv = this.detailsS.detailsForm.get('anyanyelv');
    anyanyelv?.valueChanges.pipe(first()).subscribe(() => this.s.addFirstLanguage(anyanyelv.value) );
  }

  ngOnInit(): void {
    this.anyanyelvChangeDetector()
  }

}
