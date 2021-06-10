import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAppNamesComponent } from './get-app-names.component';

describe('GetAppNamesComponent', () => {
  let component: GetAppNamesComponent;
  let fixture: ComponentFixture<GetAppNamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetAppNamesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetAppNamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
