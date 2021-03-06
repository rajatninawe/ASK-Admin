import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireModule } from "@angular/fire";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SharedModule } from "./shared/shared.module";
import { PagesModule } from "./pages/pages.module";
import { environment } from "../environments/environment";
import { AlertComponent } from "./components/dialog/alert/alert.component";
import { ConfirmComponent } from "./components/dialog/confirm/confirm.component";
import { CustomComponent } from "./components/dialog/custom/custom.component";
import { AuthGuard } from "./guards/auth.guard";

// import { GoogleChartsModule } from "angular-google-charts";

import { ChartsModule } from "ng2-charts";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    ConfirmComponent,
    CustomComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    PagesModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    ChartsModule,
    // GoogleChartsModule,
  ],
  providers: [AuthGuard],
  exports: [],
  bootstrap: [AppComponent],
  entryComponents: [AlertComponent, ConfirmComponent, CustomComponent],
})
export class AppModule {}
