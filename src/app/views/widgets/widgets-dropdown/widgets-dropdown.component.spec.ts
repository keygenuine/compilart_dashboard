import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonModule, DropdownModule, GridModule, WidgetModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { iconSubset } from '../../../icons/icon-subset';
import { WidgetsDropdownComponent } from './widgets-dropdown.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('WidgetsDropdownComponent', () => {
  let component: WidgetsDropdownComponent;
  let fixture: ComponentFixture<WidgetsDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [WidgetModule, DropdownModule, IconModule, ButtonModule, ChartjsModule, GridModule, WidgetsDropdownComponent, RouterTestingModule],
})
    .compileComponents();
  });

  beforeEach(() => {

    fixture = TestBed.createComponent(WidgetsDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
