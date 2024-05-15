import { Component } from '@angular/core';
import { SelectSpellService } from './select-spells.service';
import { SpinnerService } from '../../spinner/spinner.service';
import { Subject, Subscription } from 'rxjs';
import { SpellsModel } from 'src/app/characters/chars-subforms/items/spells/spells.model';

@Component({
  selector: 'app-select-spells',
  templateUrl: './select-spells.component.html',
  styleUrls: ['./select-spells.component.css']
})
export class SelectSpellsComponent {

  constructor(
    private sSpellServ: SelectSpellService,
    private spinServ: SpinnerService
  ) {}

  public moneyFilter: number = 0;
  public karmaFilter: number = 0;
  public csoportFilter: string = 'Nincs';

  public canBeClosed: boolean = true;
  closeEvent: Subject<any> = new Subject;

  loadData(modalData: any): void {
    this.moneyFilter = modalData.moneyFilter;
    this.karmaFilter = modalData.karmaFilter;
  }

  private spellSub!: Subscription;
  public spellsList: SpellsModel[] = [];

  selectFilter(status: string) {
    return this.csoportFilter = status;
  }

  getCsoportok():Array<any> {
    const csoport = this.sSpellServ.spellsList.map(x => x.csoport);
    const csopUniq = [...new Set(csoport.map(x=> x))];
    csopUniq.sort();
    return csopUniq;
  }

  getFilteredCsoportok(): Array<any> {
    if (this.csoportFilter == 'Nincs') {
      return this.getCsoportok();
    }
    return [this.csoportFilter];
  }

  getFilteredSpellsList(csoport: string): Array<any> {
    const filtered = this.spellsList.filter(x=> x.csoport == csoport);
    return filtered;
  }

  selectSpell(_id: string) {
    const spell = this.spellsList.filter(x => x._id == _id)[0];

    this.closeEvent.next(spell);
    this.closeEvent.complete();
  }

  onClose() {
    this.closeEvent.next(''),
    this.closeEvent.complete()
  }

  ngOnInit(): void {
    this.spinServ.toggleSpinner(false);
    this.sSpellServ.getSpells();
    this.spellSub = this.sSpellServ.getSpellsUpdateListener()
    .subscribe((w: {spells: SpellsModel[]}) => {
      this.spinServ.toggleSpinner(false);
      this.spellsList = w.spells;
    });
  }

}
