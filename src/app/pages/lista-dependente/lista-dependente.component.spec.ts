import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDependenteComponent } from './lista-dependente.component';

describe('ListaDependenteComponent', () => {
  let component: ListaDependenteComponent;
  let fixture: ComponentFixture<ListaDependenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaDependenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaDependenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
