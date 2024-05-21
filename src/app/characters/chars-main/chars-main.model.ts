import { AttributesModel } from "../chars-subforms/attributes/attributes.model";
import { DetailsModel } from "../chars-subforms/details/details.model";
import { ItemsModel } from "../chars-subforms/items/items.model";
import { ResourcesModel } from "../chars-subforms/resources/resources.model";
import { SkillsModel } from "../chars-subforms/skills/skills.model";
import { StatusModel } from "../chars-subforms/status/status.model";

export interface CharModel extends DetailsModel, AttributesModel, ResourcesModel, StatusModel {

  _id?: string;
  creatorId?: string;
  skills?: Array<SkillsModel>,
  items?: Array<ItemsModel>,

}
