import { AttributesModel } from "./attributes/attributes.model";
import { DetailsModel } from "./details/details.model";
import { ItemsModel } from "./items/items.model";
import { ResourcesModel } from "./resources/resources.model";
import { SkillsModel } from "./skills/skills.model";
import { StatusModel } from "./status/status.model";

export interface CharModel extends DetailsModel, AttributesModel, ResourcesModel, StatusModel {

  _id?: string;
  creatorId?: string;
  activeSkills?: Array<SkillsModel>;
  knowledgeSkills?: Array<SkillsModel>;
  languageSkills?: Array<SkillsModel>;
  armors?: Array<ItemsModel>;
  armorAddons?: Array<ItemsModel>;
  weapons?: Array<ItemsModel>;
  weaponAddons?: Array<ItemsModel>;
  items?: Array<ItemsModel>;
  cybers?: Array<ItemsModel>;
  explosives?: Array<ItemsModel>;
  artifacts?: Array<ItemsModel>;
  spells?: Array<ItemsModel>;
  spirits?: Array<ItemsModel>;
}
