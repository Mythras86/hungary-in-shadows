import { Subject } from "rxjs";

export abstract class AModal {
  public canBeClosed: boolean = true;
  abstract closeEvent: Subject<any>;

  abstract loadData(modalData: any):void;
}
