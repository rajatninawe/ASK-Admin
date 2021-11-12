import { Id } from "./common.model";

export class UserModel implements Id {
  public id: string;
  public userName: string;
  public pwd: string;
  public docId: string;
  public status: boolean;
  public isActive: boolean;
  public isAllowedToPost: boolean;

  constructor(model: any = {}) {
    this.id = model.id;
    this.userName = model.userName;
    this.pwd = model.pwd;
    this.docId = model.docId;
    this.status = model.status;
    this.isActive = model.isActive;
    this.isAllowedToPost = model.isAllowedToPost;
  }
}
