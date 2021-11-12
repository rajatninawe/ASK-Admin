import { TaxModel } from "./../../model/tax.model";
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { MyError } from "./my-error";
import { BaseService } from "./base.service";

@Injectable({ providedIn: "root" })
export class TaxesService extends BaseService<TaxModel> {
  public isAuthenticated = false;

  constructor(public db: AngularFirestore, public myErr: MyError) {
    super(db, myErr, "taxes");
  }
}
