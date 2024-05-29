import { Component, OnInit } from '@angular/core';
import { InitiativeService } from './initiative.service';
import { NewplayerService } from './newplayer/newplayer.service';

@Component({
  selector: 'app-initiative',
  templateUrl: './initiative.component.html',
  styleUrls: ['./initiative.component.css']
})
export class InitiativeComponent implements OnInit {

  constructor(
    public s: InitiativeService,
    public newPlayerS: NewplayerService
  ) {}

  sortBy() {
    this.s.players.setValue(this.s.players.value.sort((a:any, b:any) =>
      {
        if (b['ap'] > a['ap']) return 1;
        if (b['ap'] < a['ap']) return -1;
        if (b['init'] > a['init']) return 1;
        if (b['init'] < a['init']) return -1;
        return
      }
  ));
    return this.s.players.value;
  }

  checkTurn() {
    const aps = Object.values(this.s.players.value);
    console.log(aps)
  }

  ngOnInit(): void {
    this.s.createInitiative();
    this.s.addPlayer(this.newPlayerS.newPlayer('Bigfoot', 1,2,3,4,5,6));
    this.s.addPlayer(this.newPlayerS.newPlayer('Csupakabra', 2,3,4,5,6,7));
    this.s.addPlayer(this.newPlayerS.newPlayer('Nessi', 4,5,4,5,6,7));
    this.s.nextTurnSub();
    this.checkTurn();
  }
}
