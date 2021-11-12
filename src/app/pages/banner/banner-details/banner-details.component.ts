import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

import * as _ from "lodash";

@Component({
  selector: "banner-details",
  templateUrl: "./banner-details.component.html",
  styleUrls: ["./banner-details.component.scss"],
})
export class BannerDetailsComponent implements OnInit {
  recipeData;

  constructor(
    private fb: FormBuilder,

    @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<BannerDetailsComponent>
  ) {
    if (this.data.details) {
      this.recipeData = this.data.details;
    }
  }

  ngOnInit() {}
}
