import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { SkillSpecInterface, skillsSpecUtil } from '../skills.util';

@Component({
  selector: 'app-select-skill-spec',
  templateUrl: './select-skill-spec.component.html',
  styleUrls: ['./select-skill-spec.component.css']
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

  mainSkill: string = '';
  ownedSpecs: Array<string> = [];
  specs: Array<SkillSpecInterface> = []

  loadData(modalData: any): void {
    this.mainSkill = modalData.mainSkill;
    this.ownedSpecs = modalData.ownedSpecs;
  }

  onSave(nev: string) {
    this.closeEvent.next(nev),
    this.closeEvent.complete()
  }

  onClose() {
    this.closeEvent.complete();
  }

  getSpecs():Array<SkillSpecInterface> {
    const specBySkill = skillsSpecUtil.filter(x=>x.spec == this.mainSkill);
    const filteredSpecs = specBySkill.filter(x=> !this.ownedSpecs.includes(x.nev));
    return this.specs = filteredSpecs;
  }

  ngOnInit(): void {
    this.getSpecs();
  }

}
