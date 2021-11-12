import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ConfirmComponent } from "./confirm/confirm.component";
import { AlertComponent } from "./alert/alert.component";
import { CustomComponent } from "./custom/custom.component";

@Injectable({ providedIn: "root" })
export class DialogService {
  constructor(private dialog: MatDialog) {}

  closeAll() {
    this.dialog.closeAll();
  }

  alert(msg: string) {
    return this.dialog.open(AlertComponent, {
      width: "500px",
      data: {
        message: msg,
      },
    });
  }

  confirm(msg: string) {
    return this.dialog.open(ConfirmComponent, {
      width: "500px",
      data: {
        message: msg,
      },
    });
  }

  custom(title: string, msg: string) {
    return this.dialog.open(CustomComponent, {
      width: "500px",
      data: {
        message: msg,
        title: title,
      },
    });
  }
}
