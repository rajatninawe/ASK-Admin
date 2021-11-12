import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";

import * as _ from "lodash";

@Component({
  selector: "good-details",
  templateUrl: "./good-details.component.html",
  styleUrls: ["./good-details.component.scss"],
})
export class GoodDetailsComponent implements OnInit {
  fishData;

  constructor(@Inject(MAT_DIALOG_DATA) public data) {
    if (this.data.details) {
      this.fishData = this.data.details;
    }
  }

  ngOnInit() {}
}
