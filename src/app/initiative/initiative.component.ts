import { Component, OnInit } from '@angular/core';
import { InitiativeService } from './initiative.service';
import { NewplayerService } from './newplayer/newplayer.service';
import { FormArray } from '@angular/forms';
import { playerModel } from './player.model';

@Component({
  selector: 'app-initiative',
  templateUrl: './initiative.component.html',
  styleUrls: ['./initiative.component.scss']
})
export class InitiativeComponent implements OnInit {

  constructor(
    public s: InitiativeService,
    public newPlayerS: NewplayerService
  ) {}

  showMe: string = '';
  npcShowMe: boolean = false;

  gruntCounter: number = 1;
  veteranCounter: number = 1;
  eliteCounter: number = 1;

  sortedPlayers(): Array<playerModel> {
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
          return 0;
        }
      ));
    }
    return this.s.players.value;
  }

  toggleShowMe(player: string): void {
    if (this.showMe != player) {
      this.showMe = player;
      return
    }
    this.showMe = '';
  }

  toggleNpcBar() {
    this.npcShowMe = !this.npcShowMe;
  }

  addGrunt() {
    this.s.addPlayer(this.newPlayerS.newPlayer('Grunt '+this.gruntCounter, 5,3,3,4,3,4));
    this.gruntCounter = this.gruntCounter+1;
  }

  addVeteran() {
    this.s.addPlayer(this.newPlayerS.newPlayer('Veteran '+this.veteranCounter, 7,4,4,5,4,5));
    this.veteranCounter = this.veteranCounter+1;
  }

  addElite() {
    this.s.addPlayer(this.newPlayerS.newPlayer('Elite '+this.eliteCounter, 9,5,5,6,5,6));
    this.eliteCounter = this.eliteCounter+1;
  }

  reset(): void {
    this.s.turn = 1;
    this.s.phase = 1;
    this.s.players.clear();
    this.gruntCounter = 1;
    this.veteranCounter = 1;
    this.eliteCounter = 1;
  }


  ngOnInit(): void {
    this.s.createInitiative();
  }
}
