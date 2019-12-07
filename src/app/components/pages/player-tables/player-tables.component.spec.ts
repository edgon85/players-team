import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerTablesComponent } from './player-tables.component';

describe('PlayerTablesComponent', () => {
  let component: PlayerTablesComponent;
  let fixture: ComponentFixture<PlayerTablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerTablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
