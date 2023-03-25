import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfirmingLeavingEquipeComponent } from './modal-confirming-leaving-equipe.component';

describe('ModalConfirmingLeavingEquipeComponent', () => {
  let component: ModalConfirmingLeavingEquipeComponent;
  let fixture: ComponentFixture<ModalConfirmingLeavingEquipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalConfirmingLeavingEquipeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalConfirmingLeavingEquipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
