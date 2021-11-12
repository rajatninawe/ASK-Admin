import { PushNotificationsComponent } from "./push_notifications/push_notifications.component";
import { TaxesComponent } from "./taxes/taxes.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LayoutsComponent } from "../layouts/layouts.component";
import { GoodsComponent } from "./goods/goods.component";
import { UsersComponent } from "./users/users.component";

const routes: Routes = [
  {
    path: "",
    component: LayoutsComponent,
    children: [
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      {
        path: "dashboard",
        loadChildren: () =>
          import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
      },
      {
        path: "recipes",
        loadChildren: () =>
          import("./banner/banner.module").then((m) => m.BannerModule),
      },
      { path: "fish", component: GoodsComponent },
      { path: "taxes", component: TaxesComponent },
      { path: "users", component: UsersComponent },
      { path: "pushNotification", component: PushNotificationsComponent },
    ],
  },
  {
    path: "login",
    loadChildren: () =>
      import("./login/login.module").then((m) => m.LoginModule),
  },
  {
    path: "privacy",
    loadChildren: () =>
      import("./privacy_policy/privacy.module").then((m) => m.PrivacyModule),
  },
  {
    path: "terms_conditions",
    loadChildren: () =>
      import("./terms_conditions/terms.module").then((m) => m.TermsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
