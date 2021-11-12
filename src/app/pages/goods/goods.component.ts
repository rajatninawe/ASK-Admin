import { GoodDetailsComponent } from "./goods-details/good-details.component";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatDialog,
  MatPaginator,
  MatSnackBar,
  MatSort,
  MatTableDataSource,
} from "@angular/material";
import { GoodsModel, SubCateModel } from "../../shared/model";
import { SelectionModel } from "@angular/cdk/collections";
import {
  GoodsService,
  BannerService,
} from "../../shared/services/firebase-api";

import { PageDataService } from "../../shared";
import { DialogService } from "../../components";
import { NewGoodsComponent } from "./new-goods/new-goods.component";
import * as _ from "lodash";
import { getPaginationOption } from "../../../utils/pageSizeOptions";
@Component({
  selector: "app-goods",
  templateUrl: "./goods.component.html",
  styleUrls: ["./goods.component.scss"],
})
export class GoodsComponent implements OnInit {
  displayedColumns: string[] = [
    "select",
    "name",
    "commonName",
    "image",
    "localName",
    "pricinginStores",
    "pricinginRoad",
    "details",
  ];
  dataSource = new MatTableDataSource<GoodsModel>([]);
  selection = new SelectionModel<GoodsModel>(false, []);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  goodList: Array<GoodsModel>;
  cateList: Array<SubCateModel>;
  recipe;
  pageSizeop = getPaginationOption();

  constructor(
    private bService: BannerService,
    private goodService: GoodsService,
    private pageService: PageDataService,
    private dialogService: DialogService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.bindData();
  }

  bindData() {
    this.pageService
      .getList([this.goodService.getList(), this.bService.getList()])
      .then((results) => {
        let sorted = _.sortBy(results[0], "name");
        let filtered = _.filter(sorted, (fish) => fish.isActive == true);
        this.goodList = filtered;

        this.recipe = results[1];

        this.pageSizeop = getPaginationOption(this.goodList.length);

        this.dataSource = new MatTableDataSource(this.goodList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  onDetails(data) {
    const dialogRef = this.dialog.open(GoodDetailsComponent, {
      width: "500px",
      data: {
        isEdit: false,
        details: data,
      },
    });
  }

  onCreate() {
    const dialogRef = this.dialog.open(NewGoodsComponent, {
      width: "1000px",
      data: {
        isEdit: false,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.snackBar.open("Fish added successfully!", null, {
          duration: 3000,
          panelClass: ["green-snackbar"],
        });
        this.bindData();
      }
    });
  }

  onUpdate() {
    const cate = this.selection.selected[0];
    this.selection.toggle(cate);
    const dialogRef = this.dialog.open(NewGoodsComponent, {
      width: "1000px",
      data: {
        isEdit: true,
        model: cate,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.snackBar.open("Fish updated successfully!", null, {
          duration: 3000,
          panelClass: ["green-snackbar"],
        });
        this.bindData();
      }
    });
  }

  onDelete() {
    let docId = this.selection.selected[0].docId;
    let recipesName = [];
    let activeRecipe = _.filter(
      this.recipe,
      (recipe) => recipe.isActive == true
    );
    let recipesData = activeRecipe.map(async (value, index) => {
      let rp = value.fish.find((o) => o.id == this.selection.selected[0].docId);
      if (rp != undefined) {
        recipesName.push(
          " " + value.name[0].toUpperCase() + value.name.slice(1)
        );
      }
    });

    let dialogRef;

    if (recipesName.length > 0) {
      let message = `Please remove this fish from below mentioned recipes before deleting: \n 
      ${recipesName}`;
      this.dialogService.alert(message);
    } else {
      dialogRef = this.dialogService.confirm(
        "Are you sure you want to delete fish?"
      );
    }
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const model = new GoodsModel();
        model.isActive = false;
        model.docId = docId;
        this.selection.selected.forEach((c) => {
          this.goodService.update(model);
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

  checkboxLabel(row?: GoodsModel): string {
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
    }
  }
}
