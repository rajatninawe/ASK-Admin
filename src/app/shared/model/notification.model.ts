import { Id } from "./common.model";

export class NotificationModel implements Id {
  public id: string;
  public title: string;
  public description: string;
  public topics: any;
  public timestamp: number;
  public docId: string;

  constructor(model: any = {}) {
    this.id = model.id;
    this.title = model.title;
    this.docId = model.docId;
    this.topics = model.topics;
    this.description = model.description;
    this.timestamp = model.timestamp;
  }
}
