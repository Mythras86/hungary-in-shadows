import { Component } from '@angular/core';
import { SelectToolService } from './select-tools.service';
import { SpinnerService } from '../../spinner/spinner.service';
import { Subject, Subscription } from 'rxjs';
import { ToolsModel } from 'src/app/characters/chars-subforms/tools/tools.model';

@Component({
  selector: 'app-select-tools',
  templateUrl: './select-tools.component.html',
  styleUrls: ['./select-tools.component.css']
})
export class SelectToolsComponent {

  constructor(
    private sToolServ: SelectToolService,
    private spinServ: SpinnerService
  ) {}

  public moneyFilter: number = 0;
  public csoportFilter: string = 'Nincs';

  public canBeClosed: boolean = true;
  closeEvent: Subject<any> = new Subject;

  loadData(modalData: any): void {
    this.moneyFilter = modalData.moneyFilter;
  }

  private toolSub!: Subscription;
  public toolsList: ToolsModel[] = [];

  selectFilter(status: string) {
    return this.csoportFilter = status;
  }

  getCsoportok():Array<any> {
    const csoport = this.sToolServ.toolsList.map(x => x.csoport);
    const csopUniq = [...new Set(csoport.map(x=> x))];
    return csopUniq;
  }

  getFilteredCsoportok(): Array<any> {
    if (this.csoportFilter == 'Nincs') {
      return this.getCsoportok();
    }
    return [this.csoportFilter];
  }

  getFilteredToolsList(csoport: string): Array<any> {
    const filtered = this.toolsList.filter(x=>x.ar <= this.moneyFilter && x.csoport == csoport);
    return filtered;
  }

  selectTool(addId: string, addNev: string, addCsop: string, addMSzint: number, addSuly: number, addAr: number, addMegj: string) {
    this.closeEvent.next([addId, addNev, addCsop, addMSzint, addSuly, addAr, addMegj]);
    this.closeEvent.complete();
  }

  onClose() {
    this.closeEvent.next(''),
    this.closeEvent.complete()
  }

  ngOnInit(): void {
    this.spinServ.toggleSpinner(false);
    this.sToolServ.getTools();
    this.toolSub = this.sToolServ.getToolsUpdateListener()
    .subscribe((w: {tools: ToolsModel[]}) => {
      this.spinServ.toggleSpinner(false);
      this.toolsList = w.tools;
    });
  }

}
