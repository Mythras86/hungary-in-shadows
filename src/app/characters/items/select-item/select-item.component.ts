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

  csoportok: Array<string> = [];
  filter: string = 'Nincs';

  itemsList: Array<ItemsModel> = [];
  itemsListUpd = new BehaviorSubject<ItemsModel[]>([])

  loadData(modalData: any) {
  }

  getItems(): Observable<ItemsModel[]> {
    const items = this.http.get<ItemsModel[]>(BACKEND_URL + "list");
    return items;
  }

  getCsoportok(): Array<string> {
    const csoportok = [...new Set(this.itemsList.map(x => x.csoport))];
    return csoportok
  }

  setFilter(keyWord: string):void {
    this.filter = keyWord;
    if (this.filter == 'Nincs') {
      this.csoportok = this.getCsoportok();
    } else {
      this.csoportok = this.csoportok.filter(x=>x == keyWord);
    }
  }

  filteredItems(csoport: string): Array<ItemsModel> {
    return this.itemsList.filter(x=>x.csoport == csoport);
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
        this.csoportok = this.getCsoportok();
        this.spinS.toggleSpinner(false);
      },
      error: (error) => {
        console.log(error);
      }
    });
    this.spinS.toggleSpinner(false);
  }
}
