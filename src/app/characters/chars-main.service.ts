import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CharModel } from './chars-main.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../authentication/auth.service';
import { AttributesService } from './attributes/attributes.service';
import { DetailsService } from './details/details.service';
import { ItemsModel } from './items/items.model';
import { ItemsService } from './items/items.service';
import { ResourcesService } from './resources/resources.service';
import { SkillsModel } from './skills/skills.model';
import { SkillsService } from './skills/skills.service';
import { StatusService } from './status/status.service';

const BACKEND_URL = environment.apiUrl + "/char/";

@Injectable({
  providedIn: 'root'
})
export class CharsMainService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private authS: AuthService,
    private fb: FormBuilder,

    private detailsS: DetailsService,
    private resS: ResourcesService,
    private attrS: AttributesService,
    private statusS: StatusService,
    private skillsS: SkillsService,
    private itemsS: ItemsService,
  ) { }

  mainCharForm!: FormGroup;

  createMainForm(): void {
    this.mainCharForm = this.fb.group({
      _id: [''],
      creatorId: this.authS.getUserId(),
    });
    this.detailsS.createDetails();
    this.resS.createResources();
    this.attrS.createAttributes();
    this.statusS.createStatus();
    this.skillsS.createSkills();
    this.itemsS.createItems();
  }

  updateMainForm(w: any): void {
    this.mainCharForm = this.fb.group ({
      _id: w._id,
      creatorId: w.creatorId
    });
  }

  getOneChar(_id: string) {
    return this.http.get<CharModel>(BACKEND_URL +_id);
  }

  addOneChar(charData: CharModel) {
    const withCreator = Object.defineProperty(charData, "creatorId", {value: this.authS.getUserId(), enumerable: true});
    this.http.post(BACKEND_URL + "new", withCreator).subscribe(response => {
      this.router.navigate(["/charslist"]);
    });
  }

  updateOneChar(charData: CharModel) {
      this.http
      .patch(BACKEND_URL +this.mainCharForm.get('_id')?.value, charData)
      .subscribe(response => {
        this.router.navigate(["/charslist"]);
      }
    );
  }

}
