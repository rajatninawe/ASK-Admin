import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-brand",
  templateUrl: "./brand.component.html",
  styleUrls: ["./brand.component.scss"],
})
export class BrandComponent implements OnInit {
  @Input() brand = "ASK";
  @Input() link = ["/"];

  constructor() {}

  ngOnInit() {}
}
