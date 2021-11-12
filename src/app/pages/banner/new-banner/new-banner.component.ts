import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BannerModel, SubCateModel } from "../../../shared/model";
import {
  BannerService,
  SubCateService,
} from "../../../shared/services/firebase-api";
import { Guid } from "../../../shared/Guid";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { AngularFirestore, DocumentReference } from "@angular/fire/firestore";
import * as _ from "lodash";

@Component({
  selector: "app-new-banner",
  templateUrl: "./new-banner.component.html",
  styleUrls: ["./new-banner.component.scss"],
})
export class NewBannerComponent implements OnInit {
  bForm: FormGroup;
  subCateList: Array<SubCateModel>;
  selectCate: string[];
  img: string;
  oldImg: string = "";

  constructor(
    private fb: FormBuilder,
    private cateService: SubCateService,
    private bService: BannerService,
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<NewBannerComponent>,
    private db: AngularFirestore
  ) {
    this.initForm();
    this.cateService.getList().subscribe((r) => {
      let sortedObjs = _.sortBy(r, "name");
      let filtered = _.filter(sortedObjs, (fish) => fish.isActive == true);
      this.subCateList = filtered;

      if (this.data.model) {
        this.selectCate = this.data.model.fish.map((value, index) => {
          return value.id;
        });
      }
    });
  }

  ngOnInit() {}

  initForm() {
    let imgval = this.data.isEdit ? [""] : ["", [Validators.required]];
    this.bForm = this.fb.group({
      name: ["", [Validators.required]],
      description: ["", [Validators.required]],
      ingredients: ["", [Validators.required]],
      directions: ["", [Validators.required]],
      img: imgval,
    });

    if (this.data.model) {
      this.bForm.get("name").setValue(this.data.model.name);
      // this.bForm.get("selectCate").setValue(this.data.model.fish.id);
      this.bForm.get("description").setValue(this.data.model.description);
      this.bForm.get("ingredients").setValue(this.data.model.ingredients);
      this.bForm.get("directions").setValue(this.data.model.directions);
      this.oldImg = this.data.model.img;
    }
  }

  onSave() {
    const model = new BannerModel();

    model.description = this.bForm.controls.description.value;
    model.name = this.bForm.controls.name.value;
    model.ingredients = Array.isArray(this.bForm.controls.ingredients.value)
      ? this.bForm.controls.ingredients.value
      : this.bForm.controls.ingredients.value.split(",");
    model.directions = this.bForm.controls.directions.value;
    model.img =
      this.bForm.controls.img.value != undefined
        ? this.bForm.controls.img.value
        : this.oldImg;
    model.isActive = true;

    let fishData = [];
    fishData = this.selectCate.map((value, index) => {
      try {
        return this.db.doc("/fish_directory/" + value).ref;
      } catch (e) {
        console.log(e);
      }
    });
    // model.fish = this.db.doc("/fish_directory/" + this.selectCate).ref;
    model.fish = fishData;

    if (this.data.model) {
      model.docId = this.data.model.docId;
      this.bService.updateRecepie(model).then(() => {
        this.dialogRef.close(true);
      });
    } else {
      this.bService.addRecepie(model).then(() => this.dialogRef.close(true));
    }
  }
}
