import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import {
  MatPaginator,
  MatDialog,
  MatSort,
  MatTableDataSource,
  MatSnackBar,
} from "@angular/material";
import { UserModel } from "../../shared/model";
import { SelectionModel } from "@angular/cdk/collections";
import { UsersService } from "../../shared/services/firebase-api";
import { NewUsersComponent } from "./new-users/new-users.component";
import * as _ from "lodash";
import * as XLSX from "xlsx";
import { DialogService } from "../../components";
import { getPaginationOption } from "../../../utils/pageSizeOptions";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = [
    "select",
    "email",
    "name",
    "phone",
    "zipcode",
    "city",
    "status",
    "isAllowedToPost",
  ];
  dataSource = new MatTableDataSource<UserModel>([]);
  selection = new SelectionModel<UserModel>(false, []);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild("TABLE", { static: false }) table: ElementRef;

  tableRowCount;
  pageSizeop = getPaginationOption();

  constructor(
    private usersService: UsersService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.bindData();
  }

  onExport() {
    let ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(
      this.table.nativeElement
    );
    const dialogRef = this.dialogService.custom(
      "Export Data",
      "Are you sure you want to export data to Excel?"
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.exportExcel();
      }
    });
  }

  exportExcel() {
    let ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(
      this.table.nativeElement
    );
    ws["!cols"] = [];
    ws["!cols"][0] = { hidden: true };
    let wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Users_list");
    var currentTimeInSeconds = Math.floor(Date.now() / 1000);

    /* save to file */
    XLSX.writeFile(wb, currentTimeInSeconds + "_Users.xlsx");
  }

  bindData() {
    this.usersService.getList().subscribe((result) => {
      this.dataSource = new MatTableDataSource(
        _.sortBy(result, "createdAt").reverse()
      );

      this.pageSizeop = getPaginationOption(result.length);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = function (
        data: any,
        filter: string
      ): boolean {
        return (
          data.firstName.toLowerCase().toString().includes(filter) ||
          data.lastName.toLowerCase().includes(filter) ||
          data.phoneNumber.toString().includes(filter) ||
          data.email.toString().includes(filter) ||
          data.address[0].zipCode.toString().includes(filter) ||
          data.address[0].city.toString().includes(filter)
        );
      };
    });
  }

  onUpdate() {
    const cate = this.selection.selected[0];
    this.selection.toggle(cate);
    const dialogRef = this.dialog.open(NewUsersComponent, {
      width: "500px",
      data: {
        isEdit: true,
        model: cate,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.snackBar.open("Status updated successfully", null, {
          duration: 3000,
          panelClass: ["green-snackbar"],
        });
        this.bindData();
      }
    });
  }

  rowSelection(row) {
    this.selection.toggle(row);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  checkboxLabel(row?: UserModel): string {
    if (!row) {
      return `${this.isAllSelected() ? "select" : "deselect"} all`;
    }
    return `${this.selection.isSelected(row) ? "deselect" : "select"} row ${
      row.id + 1
    }`;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
      this.tableRowCount = this.dataSource.filteredData.length;
    }
  }
}
