import { ErrorHandler, Injectable } from "@angular/core";
import { DialogService } from "../../components";

@Injectable({ providedIn: "root" })
export class MyErrorHandler implements ErrorHandler {
  constructor(private dialog: DialogService) {}

  handleError(error: any): void {
    this.dialog.alert(error);
  }
}
