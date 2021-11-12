import { NewNotificationComponent } from "./push_notifications/new-notification/new-notification.component";
import { PushNotificationsComponent } from "./push_notifications/push_notifications.component";
import { NewTaxesComponent } from "./taxes/new-taxes/new-taxes.component";
import { TaxesComponent } from "./taxes/taxes.component";
import { BannerDetailsComponent } from "./banner/banner-details/banner-details.component";
import { GoodDetailsComponent } from "./goods/goods-details/good-details.component";
import { FileUploadModule } from "./../components/file-upload/file-upload.module";
import { NewUsersComponent } from "./users/new-users/new-users.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PagesComponent } from "./pages.component";
import { PagesRoutingModule } from "./pages-routing.module";
import { LayoutsModule } from "../layouts/layouts.module";
import {
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule,
  MatIconModule,
  MatPaginatorModule,
  MatSelectModule,
  MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatListModule,
  MatSortModule,
  MatProgressSpinnerModule,
} from "@angular/material";
// import { MatProgressSpinnerModule } from "@angular/material";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ReactiveFormsModule } from "@angular/forms";
import { GoodsComponent } from "./goods/goods.component";
import { NewGoodsComponent } from "./goods/new-goods/new-goods.component";
import { UsersComponent } from "./users/users.component";
import { FormsModule } from "@angular/forms";
@NgModule({
  declarations: [
    PagesComponent,
    GoodsComponent,
    NewGoodsComponent,
    UsersComponent,
    NewUsersComponent,
    GoodDetailsComponent,
    BannerDetailsComponent,
    TaxesComponent,
    NewTaxesComponent,
    PushNotificationsComponent,
    NewNotificationComponent,
  ],
  imports: [
    CommonModule,
    LayoutsModule,
    PagesRoutingModule,
    MatIconModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    FileUploadModule,
    MatCardModule,
    MatTooltipModule,
    MatSortModule,
    MatProgressSpinnerModule,
    FormsModule,
  ],
  entryComponents: [
    NewGoodsComponent,
    NewUsersComponent,
    GoodDetailsComponent,
    BannerDetailsComponent,
    NewTaxesComponent,
    NewNotificationComponent,
  ],
})
export class PagesModule {}
