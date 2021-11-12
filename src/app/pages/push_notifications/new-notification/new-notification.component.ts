import { NotificationService } from "./../../../shared/services/firebase-api/notification.service";
import { NotificationModel } from "./../../../shared/model/notification.model";

import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

import { sendNotification } from "../../../../utils/sendNotification";

@Component({
  selector: "app-new-notifications",
  templateUrl: "./new-notification.component.html",
  styleUrls: ["./new-notification.component.scss"],
})
export class NewNotificationComponent implements OnInit {
  goodForm: FormGroup;
  isLoading = false;

  public addresses: any[] = [];

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<NewNotificationComponent>
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.goodForm = this.fb.group({
      title: [
        "",
        Validators.compose([Validators.required, Validators.maxLength(35)]),
      ],
      topics: ["", Validators.compose([Validators.required])],
      description: [
        "",
        Validators.compose([Validators.required, Validators.maxLength(150)]),
      ],
    });

    if (this.data.details) {
      this.goodForm.get("title").setValue(this.data.details.title);
      this.goodForm.get("topics").setValue(this.data.details.topics[0]);
      this.goodForm.get("description").setValue(this.data.details.description);

      this.data.details.topics.forEach((element, index) => {
        if (index > 0) {
          this.goodForm.addControl(
            "topics_" + (index - 1),
            this.fb.control(
              "",
              Validators.compose([
                Validators.required,
                Validators.min(10000),
                Validators.max(999999),
              ])
            )
          );
          this.addresses.push({
            id: this.addresses.length,
            topics: element,
          });
        }
      });
    }
  }

  addAddress(topics = null) {
    this.addresses.push({
      id: this.addresses.length,
      topics: topics ? topics : "",
    });
    let index = "topics_" + (this.addresses.length - 1);
    this.goodForm.addControl(
      index.toString(),
      this.fb.control(
        "",
        Validators.compose([
          Validators.required,
          Validators.min(10000),
          Validators.max(999999),
        ])
      )
    );
  }

  removeAddress(i: number) {
    this.addresses.splice(i - 1, 1);

    let index = "topics_" + (i - 1);
    this.goodForm.removeControl(index.toString());
  }

  onSave() {
    this.isLoading = true;
    let title = this.goodForm.controls.title.value;
    let topics = this.goodForm.controls.topics.value;
    let description = this.goodForm.controls.description.value;

    // this.addAddress(zipcode);
    let topicsObj = [...this.addresses];
    topicsObj.push({ id: this.addresses.length, topics: topics });

    let topicsArray = topicsObj.map((item, index) => {
      return item.topics;
    });

    topicsObj.filter((item) => item.topics !== "");
    topicsArray.forEach((item, index) => {
      sendNotification(title, description, item)
        .then((data) => {
          if (data.status === 200 && index == topicsArray.length - 1) {
            const model = new NotificationModel();
            model.title = this.goodForm.controls.title.value;
            model.topics = topicsArray;
            model.description = this.goodForm.controls.description.value;
            model.timestamp = Date.now();
            this.notificationService.addModel(model).then(() => {
              this.isLoading = false;
              this.dialogRef.close(true);
            });
          }
        })
        .catch(() => {
          this.isLoading = false;
          this.dialogRef.close("error");
        });
    });
  }
}
