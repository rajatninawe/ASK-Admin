import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { UsersService } from "../../../shared/services/firebase-api";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { UserModel } from "../../../shared/model";

@Component({
  selector: "app-new-goods",
  templateUrl: "./new-users.component.html",
  styleUrls: ["./new-users.component.scss"],
})
export class NewUsersComponent implements OnInit {
  goodForm: FormGroup;
  selectCate: string;

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<NewUsersComponent>
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.goodForm = this.fb.group({
      status: null,
      isAllowedToPost: null,
    });

    if (this.data.model) {
      this.goodForm.get("status").setValue(this.data.model.isActive);
      this.goodForm
        .get("isAllowedToPost")
        .setValue(
          this.data.model.isAllowedToPost == false ||
            this.data.model.isAllowedToPost == undefined
            ? false
            : true
        );
    }
  }

  onSave() {
    const model = new UserModel();
    model.isActive = this.goodForm.controls.status.value;
    model.isAllowedToPost = this.goodForm.controls.isAllowedToPost.value;

    if (this.data.model) {
      model.docId = this.data.model.docId;
      this.userService.update(model).then(() => this.dialogRef.close(true));
    } else {
      this.userService.addModel(model).then(() => this.dialogRef.close(true));
    }
  }
}
