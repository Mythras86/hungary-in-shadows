import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { NewplayerService } from './newplayer.service';

@Component({
  selector: 'app-newplayer',
  templateUrl: './newplayer.component.html',
  styleUrls: ['./newplayer.component.scss']
})
export class NewplayerComponent implements OnInit {

  constructor(
    public s: NewplayerService,
  ) {}

  loadData(): void { }

  public canBeClosed: boolean = true;
  closeEvent: Subject<any> = new Subject;

  onSave(): void {
    const n = this.s.newPlayerForm;
    const data = this.s.newPlayer(
      n.value.nev,
      n.value.pancel,
      n.value.apPerTurn,
      n.value.alapTulSzint,
      n.value.szakTulSzint,
      n.value.szakertelemSzint,
      n.value.szakteruletSzint
    );
    this.closeEvent.next(data);
    this.closeEvent.complete();

  }

  onClose(): void {
    this.closeEvent.complete();
  }

  ngOnInit(): void {
    this.s.createNewPlayer();
  }

}
