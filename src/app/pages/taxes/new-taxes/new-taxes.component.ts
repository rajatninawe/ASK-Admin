import { TaxesService } from "./../../../shared/services/firebase-api/taxes.service";
import { TaxModel } from "./../../../shared/model/tax.model";
import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: "app-new-taxes",
  templateUrl: "./new-taxes.component.html",
  styleUrls: ["./new-taxes.component.scss"],
})
export class NewTaxesComponent implements OnInit {
  goodForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private taxesService: TaxesService,
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<NewTaxesComponent>
  ) {
    this.initForm();
  }

  ngOnInit() {}

  initForm() {
    this.goodForm = this.fb.group({
      name: ["", [Validators.required]],
      zipcode: ["", [Validators.required]],
      value: ["", [Validators.required]],
    });

    if (this.data.model) {
      this.goodForm.get("name").setValue(this.data.model.name);
      this.goodForm.get("zipcode").setValue(this.data.model.zipcode);
      this.goodForm.get("value").setValue(this.data.model.value);
    }
  }

  onSave() {
    const model = new TaxModel();
    model.name = this.goodForm.controls.name.value;
    model.zipcode = this.goodForm.controls.zipcode.value;
    model.value = this.goodForm.controls.value.value;

    if (this.data.model) {
      model.docId = this.data.model.docId;
      this.taxesService.update(model).then(() => this.dialogRef.close(true));
    } else {
      this.taxesService.addModel(model).then(() => this.dialogRef.close(true));
    }
  }
}
