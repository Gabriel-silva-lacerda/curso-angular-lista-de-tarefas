import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTodolistComponent } from './home-todolist.component';

describe('HomeTodolistComponent', () => {
  let component: HomeTodolistComponent;
  let fixture: ComponentFixture<HomeTodolistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeTodolistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeTodolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
