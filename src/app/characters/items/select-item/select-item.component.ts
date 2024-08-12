import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ItemsModel } from '../items.model';
import { SpinnerService } from 'src/app/elements/spinner/spinner.service';
import { ItemSelectService } from 'src/app/elements/item-select/item-select.service';

const BACKEND_URL = environment.apiUrl + "/items/";

@Component({
  selector: 'app-select-item',
  templateUrl: './select-item.component.html',
  styleUrls: ['./select-item.component.scss']
})
export class SelectItemComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private spinS: SpinnerService,
    public select: ItemSelectService,
  ) {
  }

  public canBeClosed: boolean = true;
  closeEvent: Subject<any> = new Subject;

  filter: string = '';

  itemsList: Array<ItemsModel> = [];
  itemsListUpd = new BehaviorSubject<ItemsModel[]>([])

  csoportok: Array<string> = [];

  getCsoportok(): Array<string> {
    const newCsoportok = [...new Set(this.itemsList.flatMap(x => x.csoport).sort())];
    return this.csoportok = newCsoportok;
  }

  getTipusok(csoport: string): Array<string> {
    const newTipusok = [...new Set(this.itemsList.filter(x => x.csoport == csoport).map(x=>x.tipus).sort())];
    return newTipusok;
  }

  getFilteredItems(csoport: string, tipus: string): ItemsModel[] {
    const array = this.itemsList.filter(x=>x.csoport == csoport).filter(x=>x.tipus == tipus).sort(function(a, b){
      if(a.nev < b.nev) { return -1; }
      if(a.nev > b.nev) { return 1; }
      return 0;
    });
    return array;
  }

  loadData(modalData: any) {
  }

  getItems(): Observable<ItemsModel[]> {
    const itemsList = this.http.get<ItemsModel[]>(BACKEND_URL + "list");
    return itemsList;
  }

  setFilter(filter: string): void {
    this.filter = filter;
  }

  onSave(item: ItemsModel) {
    this.closeEvent.next(item);
    this.closeEvent.complete();
  }

  onClose() {
    this.closeEvent.complete();
  }

  ngOnInit(): void {
    this.spinS.toggleSpinner(true);
    this.getItems().subscribe({
      next: (w: ItemsModel[]) => {
        this.itemsList = w;
        this.itemsListUpd.next([...this.itemsList]);
        this.getCsoportok();
        this.spinS.toggleSpinner(false);
      },
      error: (error) => {
        console.log(error);
      }
    });
    this.spinS.toggleSpinner(false);
  }
}
