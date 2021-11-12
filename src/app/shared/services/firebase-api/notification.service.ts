import { NotificationModel } from "./../../model/notification.model";
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { MyError } from "./my-error";
import { BaseService } from "./base.service";

@Injectable({ providedIn: "root" })
export class NotificationService extends BaseService<NotificationModel> {
  public isAuthenticated = false;

  constructor(public db: AngularFirestore, public myErr: MyError) {
    super(db, myErr, "notifications");
  }
}
