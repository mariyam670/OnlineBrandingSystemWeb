import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPageViewComponent } from './edit-page-view.component';

describe('EditPageViewComponent', () => {
  let component: EditPageViewComponent;
  let fixture: ComponentFixture<EditPageViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPageViewComponent]
    });
    fixture = TestBed.createComponent(EditPageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
