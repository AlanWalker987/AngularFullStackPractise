import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSuperHeroComponent } from './new-super-hero.component';

describe('NewSuperHeroComponent', () => {
  let component: NewSuperHeroComponent;
  let fixture: ComponentFixture<NewSuperHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSuperHeroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSuperHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
