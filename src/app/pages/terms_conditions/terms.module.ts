import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TermsRoutingModule } from "./terms-routing.module";
import { TermsComponent } from "./terms.component";
import {
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule,
} from "@angular/material";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [TermsComponent],
  imports: [
    CommonModule,
    TermsRoutingModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class TermsModule {}
