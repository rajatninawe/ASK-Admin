import { NewTaxesComponent } from "./new-taxes.component";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

describe("NewUsersComponent", () => {
  let component: NewTaxesComponent;
  let fixture: ComponentFixture<NewTaxesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewTaxesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTaxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
