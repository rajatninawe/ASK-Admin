import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { LoginService } from "../../shared/services/firebase-api";
import { Router, Routes, RouterModule } from "@angular/router";
import { Md5 } from "ts-md5/dist/md5";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  bForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar,
    private firebaseAuth: AngularFireAuth
  ) {
    this.initForm();
  }

  ngOnInit() {
    this.logout();
  }

  logout() {
    this.firebaseAuth.auth.signOut();
    localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("token");
    localStorage.removeItem("adminInfo");
  }

  initForm() {
    this.bForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8)]],
    });
  }

  onLogin() {
    let email = this.bForm.controls.email.value;
    let password = this.bForm.controls.password.value;
    const md5 = new Md5();
    let hashedPassword = md5.appendStr(password).end().toString();
    this.loginService.login(email, password).then((val) => {
      let data: any = val;
      if (val != false) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("adminInfo", data.user.email);
        this.router.navigate(["/pages/dashboard"]);
      } else {
        this.snackBar.open("Incorrect Email/Password", null, {
          duration: 3000,
          panelClass: ["red-snackbar"],
        });
      }
    });
  }
}
