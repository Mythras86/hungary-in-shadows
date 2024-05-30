import { Component, OnInit } from '@angular/core';
import { InitiativeService } from './initiative.service';
import { NewplayerService } from './newplayer/newplayer.service';
import { FormArray } from '@angular/forms';

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

  sortedPlayers() {
    if (this.s.phase == 2) {
      this.s.players.setValue(this.s.players.value.sort((a:any, b:any) =>
        {
          if (a['status'] > b['status']) return 1;
          if (a['status'] < b['status']) return -1;
          if (b['ap'] > a['ap']) return 1;
          if (b['ap'] < a['ap']) return -1;
          if (b['init'] > a['init']) return 1;
          if (b['init'] < a['init']) return -1;
          if (b['pancel'] > a['pancel']) return 1;
          if (b['pancel'] < a['pancel']) return -1;
          return 0;
        }
      ));
    } else {
      this.s.players.setValue(this.s.players.value.sort((a:any, b:any) =>
        {
          if (a['status'] > b['status']) return 1;
          if (a['status'] < b['status']) return -1;
          if (a['init'] > b['init']) return 1;
          if (a['init'] < b['init']) return -1;
          if (b['ap'] > a['ap']) return 1;
          if (b['ap'] < a['ap']) return -1;
          return 0;
        }
      ));
    }
    return this.s.players.value;
  }

  ngOnInit(): void {
    this.s.createInitiative();
    this.s.addPlayer(this.newPlayerS.newPlayer('Bigfoot', 1,2,3,4,5,6));
    this.s.addPlayer(this.newPlayerS.newPlayer('Csupakabra', 2,3,4,5,6,7));
    this.s.addPlayer(this.newPlayerS.newPlayer('Nessi', 4,5,4,5,6,7));
  }
}
