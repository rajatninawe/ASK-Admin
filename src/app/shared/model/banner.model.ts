import { Id } from "./common.model";

export class BannerModel implements Id {
  public id: string;
  public name: string;
  public img: string;
  public cateId: string;
  public docId: string;
  public fish: string[];
  public description: string;
  public fishDetails;
  public fishArr: string[];
  public ingredients: string[];
  public directions: string;
  public isActive: boolean;

  constructor(model: any = {}) {
    this.id = model.id;
    this.name = model.name;
    this.img = model.img;
    this.cateId = model.cateId;
    this.docId = model.docId;
    this.fish = model.fish;
    this.description = model.description;
    this.fishDetails = model.fishDetails;
    this.fishArr = model.fishArr;
    this.ingredients = model.ingredients;
    this.directions = model.directions;
    this.isActive = model.isActive;
  }
}
