import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { SkillSpecInterface, skillsSpecUtil } from '../skills.util';
import { SkillsModel } from '../skills.model';

@Component({
  selector: 'app-select-skill-spec',
  templateUrl: './select-skill-spec.component.html',
  styleUrls: ['./select-skill-spec.component.scss']
})
export class SelectSkillSpecComponent implements OnInit {

  constructor() {}

  csoportok: Array<string> = [
    'Aktív szakértelmek',
    'Ismeret szakértelmek',
    'Nyelvi szakértelmek'
  ];

  public canBeClosed: boolean = true;
  closeEvent: Subject<any> = new Subject;

  mainSkill!: SkillsModel;
  ownedSpecs: Array<string> = [];
  specs: Array<SkillSpecInterface> = []

  loadData(modalData: any): void {
    this.mainSkill = modalData.mainSkill;
    this.ownedSpecs = modalData.ownedSpecs;
  }

  onSave(spec: SkillSpecInterface) {
    this.closeEvent.next(spec),
    this.closeEvent.complete()
  }

  onClose() {
    this.closeEvent.complete();
  }

  getSpecs():Array<SkillSpecInterface> {
    const specBySkill = skillsSpecUtil.filter(x=>x.specOf == this.mainSkill.id);
    const filteredSpecs = specBySkill.filter(x=> !this.ownedSpecs.includes(x.id));
    return this.specs = filteredSpecs;
  }

  ngOnInit(): void {
    this.getSpecs();
  }

}
