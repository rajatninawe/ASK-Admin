import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./dashboard.component";
import { ChartsModule, ThemeService } from "ng2-charts";
import { MatProgressSpinnerModule } from "@angular/material";

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ChartsModule,
    MatProgressSpinnerModule,
  ],
  providers: [ThemeService],
})
export class DashboardModule {}
