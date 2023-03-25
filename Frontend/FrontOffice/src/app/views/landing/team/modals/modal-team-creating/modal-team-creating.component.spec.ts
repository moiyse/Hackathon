import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTeamCreatingComponent } from './modal-team-creating.component';

describe('ModalTeamCreatingComponent', () => {
  let component: ModalTeamCreatingComponent;
  let fixture: ComponentFixture<ModalTeamCreatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalTeamCreatingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTeamCreatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
