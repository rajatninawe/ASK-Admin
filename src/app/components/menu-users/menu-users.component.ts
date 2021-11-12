import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-menu-users",
  templateUrl: "./menu-users.component.html",
  styleUrls: ["./menu-users.component.scss"],
})
export class MenuUsersComponent implements OnInit {
  isAuthenticated: Observable<boolean>;
  adminUser = localStorage.getItem("adminInfo");

  constructor(private router: Router) {}

  ngOnInit() {}

  onLogin() {}

  onExit() {
    this.router.navigate(["/login"]);
  }
}
