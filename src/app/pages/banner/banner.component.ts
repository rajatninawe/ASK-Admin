import { BannerDetailsComponent } from "./banner-details/banner-details.component";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatDialog,
  MatPaginator,
  MatSnackBar,
  MatSort,
  MatTableDataSource,
} from "@angular/material";

import { PageDataService } from "../../shared";
import { BannerService } from "../../shared/services/firebase-api";
import { SelectionModel } from "@angular/cdk/collections";
import { NewBannerComponent } from "./new-banner/new-banner.component";
import { DialogService } from "../../components";
import * as _ from "lodash";
import { BannerModel } from "../../shared/model";
import { getPaginationOption } from "../../../utils/pageSizeOptions";
@Component({
  selector: "app-banner",
  templateUrl: "./banner.component.html",
  styleUrls: ["./banner.component.scss"],
})
export class BannerComponent implements OnInit {
  displayedColumns: string[] = ["check", "name", "fish", "image", "details"];
  dataSource = new MatTableDataSource<any>([]);
  selection = new SelectionModel<any>(false, []);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  pageSizeop = getPaginationOption();

  constructor(
    private bService: BannerService,
    private pageService: PageDataService,
    private dialog: MatDialog,
    private dialogService: DialogService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.bindData();
  }

  bindData() {
    this.pageService.getSingleList<any>(this.bService).then(async (r) => {
      let count = 0;

      let filtered = _.filter(r, (recipe) => recipe.isActive == true);

      let fishData = await filtered.map(async (value, index) => {
        try {
          let fd = value.fish;
          let fishall = await fd.map(async (fsh, index) => {
            let tmp = await fsh.get();
            let fshdt = tmp.data();
            return (
              fshdt.name.charAt(0).toUpperCase() +
              fshdt.name.substr(1).toLowerCase()
            );
          });
          let dsff = await Promise.all(fishall);

          // let fishDetail = await value.fish.get();
          return {
            ...filtered[index],
            fishDetails: dsff.length > 0 ? dsff : "NA",
          };
        } catch (e) {
          console.log(e);
        } finally {
          count += 1;
        }
      });

      Promise.all(fishData).then((d) => {
        this.dataSource = new MatTableDataSource(_.sortBy(d, "name"));

        this.pageSizeop = getPaginationOption(d.length);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    });
  }

  onDetails(data) {
    const dialogRef = this.dialog.open(BannerDetailsComponent, {
      width: "500px",
      data: {
        isEdit: false,
        details: data,
      },
    });
  }

  onCreate() {
    const dialogRef = this.dialog.open(NewBannerComponent, {
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
    const dialogRef = this.dialog.open(NewBannerComponent, {
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
      "Are you sure you want to delete recipe?"
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const model = new BannerModel();
        model.isActive = false;
        model.docId = docId;
        this.bService.update(model).then(() => this.bindData());
        // this.bService.delete(docId).then(() => this.bindData());
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
