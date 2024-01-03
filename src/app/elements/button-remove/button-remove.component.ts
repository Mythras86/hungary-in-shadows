import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-remove',
  templateUrl: './button-remove.component.html',
  styleUrls: ['./button-remove.component.css']
})
export class ButtonDeleteComponent {

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
