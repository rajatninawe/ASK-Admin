import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  GoodsService,
  SubCateService,
} from "../../../shared/services/firebase-api";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { GoodsModel, SubCateModel } from "../../../shared/model";

@Component({
  selector: "app-new-goods",
  templateUrl: "./new-goods.component.html",
  styleUrls: ["./new-goods.component.scss"],
})
export class NewGoodsComponent implements OnInit {
  goodForm: FormGroup;
  cateList: Array<SubCateModel>;
  selectCate: string;
  img: string;

  constructor(
    private fb: FormBuilder,
    private goodService: GoodsService,
    private subCateService: SubCateService,
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<NewGoodsComponent>
  ) {
    this.initForm();
  }

  ngOnInit() {
    this.subCateService.getList().subscribe((r) => {
      this.cateList = r;
      if (this.data.model) {
        this.selectCate = this.data.model.subCateId;
      }
    });
  }

  initForm() {
    let imgval = this.data.isEdit ? [""] : ["", [Validators.required]];
    this.goodForm = this.fb.group({
      name: ["", [Validators.required]],
      commonName: ["", [Validators.required]],
      localName: ["", [Validators.required]],
      comparableTo: ["", [Validators.required]],
      description: ["", [Validators.required]],
      preparations: ["", [Validators.required]],
      sustainability: ["", [Validators.required]],
      averagePriceS: ["", [Validators.required]],
      averagePriceR: ["", [Validators.required]],
      image: "",
      img: imgval,
    });

    if (this.data.model) {
      this.goodForm.get("name").setValue(this.data.model.name);
      this.goodForm.get("commonName").setValue(this.data.model.commonName);
      this.goodForm.get("localName").setValue(this.data.model.localName);
      this.goodForm.get("comparableTo").setValue(this.data.model.comparableTo);
      this.goodForm.get("description").setValue(this.data.model.description);
      this.goodForm.get("preparations").setValue(this.data.model.preparations);
      this.goodForm
        .get("sustainability")
        .setValue(this.data.model.sustainability);
      this.goodForm.get("image").setValue(this.data.model.image);
      this.goodForm
        .get("averagePriceR")
        .setValue(this.data.model.pricing.inRoad.averagePrice);
      this.goodForm
        .get("averagePriceS")
        .setValue(this.data.model.pricing.inStores.averagePrice);
    }
  }

  onSave() {
    const model = new GoodsModel();

    model.name = this.goodForm.controls.name.value;
    model.commonName = Array.isArray(this.goodForm.controls.commonName.value)
      ? this.goodForm.controls.commonName.value
      : this.goodForm.controls.commonName.value.split(",");
    model.localName = this.goodForm.controls.localName.value;
    model.comparableTo = this.goodForm.controls.comparableTo.value;
    model.description = this.goodForm.controls.description.value;
    model.preparations = this.goodForm.controls.preparations.value;
    model.sustainability = this.goodForm.controls.sustainability.value;
    model.image = this.goodForm.controls.img.value;
    model.isActive = true;

    model.pricing = {
      inRoad: {
        averagePrice: this.goodForm.controls.averagePriceR.value,
      },
      inStores: {
        averagePrice: this.goodForm.controls.averagePriceS.value,
      },
    };

    if (this.data.model) {
      model.docId = this.data.model.docId;
      this.goodService.update(model).then(() => this.dialogRef.close(true));
    } else {
      this.goodService
        .addModel(model)
        .then((data) => {
          let docId = data.id;
          return docId;
        })
        .then((id) => {
          model.docId = id;
          this.goodService.update(model).then(() => this.dialogRef.close(true));
        });
    }
  }
}
