import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { UserModel } from "../../model";
import { MyError } from "./my-error";
import { BaseService } from "./base.service";
import { catchError, map } from "rxjs/operators";
import { Observable } from "rxjs";
import * as firebase from "firebase/app";

@Injectable({ providedIn: "root" })
export class LoginService extends BaseService<UserModel> {
  public isAuthenticated = false;
  user: Observable<firebase.User>;

  constructor(
    public db: AngularFirestore,
    public myErr: MyError,
    private firebaseAuth: AngularFireAuth
  ) {
    super(db, myErr, "admin");
    this.user = firebaseAuth.authState;
  }

  login(name: string, pwd: string) {
    return this.firebaseAuth.auth
      .signInWithEmailAndPassword(name, pwd)
      .then((value) => {
        return value;
      })
      .catch((err) => {
        return false;
      });
    // return this.baseCollection.snapshotChanges().pipe(
    //   map((d) => {
    //     return d
    //       .map((action) => {
    //         const data = action.payload.doc.data();

    //         return new UserModel({ docId: action.payload.doc.id, ...data });
    //       })
    //       .find((s) => s.userName === name && s.pwd === pwd);
    //   }),
    //   catchError(this.myErr.handleError)
    // );
  }
}
