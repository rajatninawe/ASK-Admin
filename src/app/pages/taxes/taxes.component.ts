import { TaxesService } from "./../../shared/services/firebase-api/taxes.service";
import { NewTaxesComponent } from "./new-taxes/new-taxes.component";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatPaginator,
  MatDialog,
  MatSort,
  MatTableDataSource,
  MatSnackBar,
} from "@angular/material";

import { SelectionModel } from "@angular/cdk/collections";
import { DialogService } from "../../components";
import * as _ from "lodash";
import { getPaginationOption } from "../../../utils/pageSizeOptions";
@Component({
  selector: "taxes",
  templateUrl: "./taxes.component.html",
  styleUrls: ["./taxes.component.scss"],
})
export class TaxesComponent implements OnInit {
  displayedColumns: string[] = ["check", "name", "zipcode", "value"];
  dataSource = new MatTableDataSource<any>([]);
  selection = new SelectionModel<any>(false, []);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  pageSizeop = getPaginationOption();

  constructor(
    private taxesService: TaxesService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.bindData();
  }

  bindData() {
    this.taxesService.getList().subscribe((result) => {
      this.dataSource = new MatTableDataSource(_.sortBy(result, "name"));

      this.pageSizeop = getPaginationOption(result.length);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  onCreate() {
    const dialogRef = this.dialog.open(NewTaxesComponent, {
      width: "1000px",
      data: {
        isEdit: false,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.snackBar.open("Recipe added successfully!", null, {
          duration: 3000,
          panelClass: ["green-snackbar"],
        });
        this.bindData();
      }
    });
  }

  onUpdate(event) {
    const banner = this.selection.selected[0];
    this.selection.toggle(banner);
    const dialogRef = this.dialog.open(NewTaxesComponent, {
      width: "1000px",
      data: {
        isEdit: true,
        model: banner,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.snackBar.open("Recipe edited successfully!", null, {
          duration: 3000,
          panelClass: ["green-snackbar"],
        });
        this.bindData();
      }
    });
  }

  onDelete() {
    const docId = this.selection.selected[0].docId;
    this.selection.toggle(this.selection.selected[0]);
    const dialogRef = this.dialogService.confirm(
      "Are you sure you want to delete?"
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.taxesService.delete(docId).then(() => this.bindData());
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
