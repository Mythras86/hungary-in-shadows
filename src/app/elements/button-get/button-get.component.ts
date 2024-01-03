import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-get',
  templateUrl: './button-get.component.html',
  styleUrls: ['./button-get.component.css']
})
export class ButtonBuyComponent {

  @Input() szoveg: string = "Megvesz";
  @Input() karmaKtsg: number = 0;
  @Input() tokeKtsg: number = 0;
  @Input() karmaMulti: number = 1;
  @Input() tokeMulti: number = 1;

  karmaTotal(): number {
    return this.karmaKtsg*this.karmaMulti;
  }

  tokeTotal(): number {
    return this.tokeKtsg*this.tokeMulti;
  }

}
