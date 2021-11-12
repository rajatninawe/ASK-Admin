import { Id } from "./common.model";

export class GoodsModel implements Id {
  public id: string;
  public docId: string;
  public name: string;
  public commonName: string[];
  public localName: string;
  public comparableTo: string;
  public description: string;
  public preparations: string;
  public sustainability: string;
  public image: string;
  public pricing: {};
  public averagePriceR: string;
  public averagePriceS: string;
  public isActive: boolean;

  constructor(good: any = {}) {
    this.commonName = good.commonName;
    this.localName = good.localName;
    this.image = good.image;
    this.comparableTo = good.comparableTo;
    this.name = good.name;
    this.description = good.description;
    this.preparations = good.preparations;
    this.sustainability = good.sustainability;
    this.pricing = good.pricing;
    this.docId = good.docId;
    this.averagePriceR = good.averagePriceR;
    this.averagePriceS = good.averagePriceS;
    this.isActive = good.isActive;
  }
}
