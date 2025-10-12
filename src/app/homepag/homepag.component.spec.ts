import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepagComponent } from './homepag.component';

describe('HomepagComponent', () => {
  let component: HomepagComponent;
  let fixture: ComponentFixture<HomepagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomepagComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomepagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
