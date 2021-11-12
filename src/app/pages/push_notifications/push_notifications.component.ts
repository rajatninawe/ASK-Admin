import { NotificationService } from "../../shared/services/firebase-api/notification.service";

import { NewNotificationComponent } from "./new-notification/new-notification.component";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatPaginator,
  MatDialog,
  MatSort,
  MatTableDataSource,
  MatSnackBar,
} from "@angular/material";

import { SelectionModel } from "@angular/cdk/collections";
import * as _ from "lodash";
import { getPaginationOption } from "../../../utils/pageSizeOptions";
@Component({
  selector: "pushNotifications",
  templateUrl: "./push_notifications.component.html",
  styleUrls: ["./push_notifications.component.scss"],
})
export class PushNotificationsComponent implements OnInit {
  displayedColumns: string[] = [
    "timestamp",
    "title",
    "description",
    "topics",
    "resend",
  ];
  dataSource = new MatTableDataSource<any>([]);
  selection = new SelectionModel<any>(false, []);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  pageSizeop = getPaginationOption();

  constructor(
    private notificationService: NotificationService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  bindData() {
    this.notificationService.getList().subscribe((result) => {
      this.dataSource = new MatTableDataSource(
        _.sortBy(result, "timestamp").reverse()
      );
      this.pageSizeop = getPaginationOption(result.length);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngOnInit() {
    this.bindData();
  }

  onCreate(data = false) {
    const dialogRef = this.dialog.open(NewNotificationComponent, {
      width: "850px",
      data: {
        isEdit: false,
        details: data,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.snackBar.open("Notification sent successfully!", null, {
          duration: 3000,
          panelClass: ["green-snackbar"],
        });
        this.bindData();
      }
      if (result === "error") {
        this.snackBar.open("Something went wrong!", null, {
          duration: 3000,
          panelClass: ["red-snackbar"],
        });
        this.bindData();
      }
    });
  }

  rowSelection(row) {
    this.selection.toggle(row);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
