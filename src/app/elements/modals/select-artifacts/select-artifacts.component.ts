import { Component } from '@angular/core';
import { SelectArtifactService } from './select-artifacts.service';
import { SpinnerService } from '../../spinner/spinner.service';
import { Subject, Subscription } from 'rxjs';
import { ArtifactsModel } from 'src/app/characters/chars-subforms/artifacts/artifacts.model';

@Component({
  selector: 'app-select-artifacts',
  templateUrl: './select-artifacts.component.html',
  styleUrls: ['./select-artifacts.component.css']
})
export class SelectArtifactsComponent {

  constructor(
    private sArtifactServ: SelectArtifactService,
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

  private artifactSub!: Subscription;
  public artifactsList: ArtifactsModel[] = [];

  selectFilter(status: string) {
    return this.csoportFilter = status;
  }

  getCsoportok():Array<any> {
    const csoport = this.sArtifactServ.artifactsList.map(x => x.csoport);
    const csopUniq = [...new Set(csoport.map(x=> x))];
    return csopUniq;
  }

  getFilteredCsoportok(): Array<any> {
    if (this.csoportFilter == 'Nincs') {
      return this.getCsoportok();
    }
    return [this.csoportFilter];
  }

  getFilteredArtifactsList(csoport: string): Array<any> {
    const filtered = this.artifactsList.filter(x=>x.ar <= this.moneyFilter && x.karma <= this.karmaFilter && x.csoport == csoport);
    return filtered;
  }

  selectArtifact(addId: string, addNev: string, addCsop: string, addMSzint: number, addAr: number, adddKarma: number, addMegj: string) {
    this.closeEvent.next([addId, addNev, addCsop, addMSzint, addAr, adddKarma, addMegj]);
    this.closeEvent.complete();
  }

  onClose() {
    this.closeEvent.next(''),
    this.closeEvent.complete()
  }

  ngOnInit(): void {
    this.spinServ.toggleSpinner(false);
    this.sArtifactServ.getArtifacts();
    this.artifactSub = this.sArtifactServ.getArtifactsUpdateListener()
    .subscribe((w: {artifacts: ArtifactsModel[]}) => {
      this.spinServ.toggleSpinner(false);
      this.artifactsList = w.artifacts;
    });
  }

}
