import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Splash2Page } from './splash2.page';

describe('Splash2Page', () => {
  let component: Splash2Page;
  let fixture: ComponentFixture<Splash2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Splash2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Splash2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
