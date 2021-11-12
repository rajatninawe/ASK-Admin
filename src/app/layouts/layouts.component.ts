import { Component, Inject, OnInit, PLATFORM_ID } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { isPlatformBrowser } from "@angular/common";
import {
  BadgeModel,
  NavigationModel,
  NavItem,
} from "../components/navigation/navigation.model";
import { MediaObserver } from "@angular/flex-layout";
import { filter } from "rxjs/operators";

@Component({
  selector: "app-layouts",
  templateUrl: "./layouts.component.html",
  styleUrls: ["./layouts.component.scss"],
})
export class LayoutsComponent implements OnInit {
  sidenavAlign = "start";
  sidenavMode = "side";
  sidenavOpen = true;
  navList: Array<NavigationModel>;

  constructor(
    private mediaService: MediaObserver,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.navigation();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        if (isPlatformBrowser(this.platformId)) {
          window.scroll(0, 0);
        }
      });
  }

  ngOnInit() {
    this.mediaService.asObservable().subscribe((change) => {
      change.forEach((c) => {
        const isMobile = c.mqAlias === "xs" || c.mqAlias === "sm";
        this.sidenavMode = isMobile ? "over" : "side";
        this.sidenavOpen = !isMobile;
      });
    });
  }

  navigation() {
    const badge = new BadgeModel({
      title: "1",
      background: "#ff4081",
      foreground: "#fff",
    });

    const dashboard = new NavigationModel({
      id: "dashboard",
      title: "Dashboard",
      type: "item",
      icon: "location_city",
      url: "/pages/dashboard",
    });

    const cateChildren: Array<NavItem> = [
      // {
      //   id: "order",
      //   title: "Order list",
      //   type: "item",
      //   icon: "menu_book",
      //   url: "/pages/order",
      // },

      {
        id: "fish",
        title: "Fish Directory",
        type: "item",
        icon: "waves",
        url: "/pages/fish",
      },
      {
        id: "banner",
        title: "Recipes",
        type: "item",
        icon: "spa",
        url: "/pages/recipes",
      },
    ];

    const directory = new NavigationModel(
      {
        id: "directory",
        title: "Directory",
        type: "collapse",
        icon: "admin_panel_settings",
      },
      null,
      cateChildren
    );

    const taxes = new NavigationModel({
      id: "taxes",
      title: "Taxes",
      type: "item",
      icon: "local_atm",
      url: "/pages/taxes",
    });

    const users = new NavigationModel({
      id: "users",
      title: "Users",
      type: "item",
      icon: "person",
      url: "/pages/users",
    });

    const pushNotification = new NavigationModel({
      id: "pushNotification",
      title: "Notifications",
      type: "item",
      icon: "forward_to_inbox",
      url: "/pages/pushNotification",
    });

    this.navList = [dashboard, taxes, pushNotification, users, directory];
  }
}
