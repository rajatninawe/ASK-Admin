// import { PostCatchService } from "./../../shared/services/firebase-api/postDetails.service";
import { Component, OnInit } from "@angular/core";
import { PageDataService } from "../../shared";
import { DialogService } from "../../components";
// import { OrderService } from "../../shared/services/firebase-api";
import * as _ from "lodash";
import { ChartOptions, ChartType, ChartDataSets } from "chart.js";
import * as pluginLabels from "chartjs-plugin-labels";
import { Color, Label } from "ng2-charts";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  postCatchDetails;
  cateList;

  //Percent delivered vs picked up

  var1 = 0;
  var2 = 0;
  var3 = 0;
  var4 = 0;
  var5 = 45;
  var6 = "Data1";
  spinner = true;

  public lineChartData: ChartDataSets[] = [
    {
      data: [0, 1, 5, 2, 4],
      label: "DataSet1",
    },
    {
      data: [8, 1, 2, 4, 3],
      label: "DataSet2",
    },
  ];
  public lineChartLabels: Label[] = [
    "Parameter 1",
    "Parameter 2",
    "Parameter 3",
    "Parameter 4",
    "Parameter 5",
  ];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    scales: {},
  };
  public lineChartColors: Color[] = [
    {
      // grey
      backgroundColor: "rgba(148,159,177,0.2)",
      borderColor: "rgba(148,159,177,1)",
      pointBackgroundColor: "rgba(148,159,177,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(148,159,177,0.8)",
    },
    {
      // red
      backgroundColor: "rgba(255,0,0,0.3)",
      borderColor: "red",
      pointBackgroundColor: "rgba(148,159,177,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(148,159,177,0.8)",
    },
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = "line";

  public pieChartLabels = ["Pick up", "Delivery"];
  public pieChartData = ["2", "4"];
  public pieChartType = "pie";
  public pieChartLegend = true;
  public pieChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      labels: {
        render: "percentage",
        fontColor: ["white", "white"],
        precision: 2,
      },
    },
  };
  public pieChartPlugins = [pluginLabels];
  public pieColors = [
    {
      backgroundColor: ["#03a9f4", "#79E2A5"],
    },
  ];

  public donutChartData = ["7", "4"];
  public donutChartLabels = ["Posts with available stock", "Posts sold out"];
  public donutChartType = "doughnut";
  public donutChartLegend = true;
  public donutChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      labels: {
        render: "percentage",
        fontColor: ["white", "white"],
        precision: 2,
      },
    },
  };
  public donutChartPlugins = [pluginLabels];
  public donutColors = [
    {
      backgroundColor: ["#03a9f4", "#79E2A5"],
    },
  ];

  constructor(
    // private postCatchService: PostCatchService,
    // private orderService: OrderService,
    private pageService: PageDataService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.bindData();
  }

  bindData() {
    // this.pageService
    //   .getList([this.postCatchService.getList(), this.orderService.getList()])
    //   .then(async (results) => {
    //     console.log("dashboard");
    //   });
    this.spinner = false;
  }
}
