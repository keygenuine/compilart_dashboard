import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  input,
  OnInit,
  ViewChild
} from '@angular/core';
import { getStyle } from '@coreui/utils';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { RouterLink } from '@angular/router';
import { IconDirective } from '@coreui/icons-angular';
import { RowComponent, ColComponent, WidgetStatAComponent, TemplateIdDirective, ThemeDirective, DropdownComponent, ButtonDirective, DropdownToggleDirective, DropdownMenuDirective, DropdownItemDirective, DropdownDividerDirective } from '@coreui/angular';
import { Input } from '@angular/core';
import { ChartService } from 'src/app/chart.service';
import { Chart } from 'chart.js';
import { Colors } from 'chart.js';
@Component({
    selector: 'app-widgets-dropdown',
    templateUrl: './widgets-dropdown.component.html',
    styleUrls: ['./widgets-dropdown.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default,
    standalone: true,
    imports: [RowComponent, ColComponent, WidgetStatAComponent, TemplateIdDirective, IconDirective, ThemeDirective, DropdownComponent, ButtonDirective, DropdownToggleDirective, DropdownMenuDirective, DropdownItemDirective, RouterLink, DropdownDividerDirective, ChartjsComponent]
})
export class WidgetsDropdownComponent implements OnInit, AfterContentInit {
  private chartFaturamento: any
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private chartService: ChartService
  ) {}
  @Input({ required: true }) elements!: (number)[];
  estilo = '#d63384';
  data: any[] = [];
  options: any[] = [];
  labels = [
    'segunda',
    'terça',
    'quarta',
    'quinta',
    'sexta',
    'sabado',
    'domingo'
  ];
  datasets = [
    [{
      label: 'Faturamento',
      backgroundColor: 'transparent',
      borderColor: 'rgba(255,255,255,.55)',
      pointBackgroundColor: getStyle('--azul'),
      pointHoverBorderColor: getStyle('--cui-primary'),
      data: [65, 59, 84, 84, 51, 55, 40]
    }], [{
      label: 'Ticket Medio',
      backgroundColor: 'transparent',
      borderColor: 'rgba(255,255,255,.55)',
      pointBackgroundColor: getStyle('--cui-info'),
      pointHoverBorderColor: getStyle('--cui-info'),
      data: [1, 18, 9, 17, 34, 22, 11]
    }], [{
      label: 'Cancelamentos',
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',
      pointBackgroundColor: getStyle('--cui-warning'),
      pointHoverBorderColor: getStyle('--cui-warning'),
      data: [78, 81, 80, 45, 34, 12, 40],
      fill: true
    }], [{
      label: 'Vendas',
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',
      data: [78, 81, 80, 45, 34, 12, 40, 85, 65, 23, 12, 98, 34, 84, 67, 82],
      barPercentage: 0.7
    }]
  ];
  optionsDefault = {
    plugins: {
      legend: {
        display: false
      }
    },
    maintainAspectRatio: true,
    scales: {
      x: {
        border: {
          display: false,
        },
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          display: false
        }
      },
      y: {
    
        display: false,
        grid: {
          display: false
        },
        ticks: {
          display: false
        }
      }
    },
    elements: {
      line: {
        borderWidth: 1,
        tension: 0.4
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4
      }
    }
  };

  ngOnInit(): void {
    // let faturamento = this.datasets[0][0].label
    // this.datasets[0][0].label //faturamento
    // this.chartFaturamento = this.chartService.newchart('chartFaturamento')
    this.datasets[0][0].data = this.elements
    this.datasets[1][0].data = this.elements
    // Chart.register(Colors)
    // this.chartFaturamento = this.chartService.newchart('chartFaturamento')
    this.setData();
  }

  ngAfterContentInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  setData() {
    
    for (let idx = 0; idx < 4; idx++) {
      this.data[idx] = {
        labels: idx < 3 ? this.labels.slice(0, 7) : this.labels,
        datasets: this.datasets[idx]
      };
    }
    this.setOptions();
  }

  setOptions() {
    for (let idx = 0; idx < 4; idx++) {
      const options = JSON.parse(JSON.stringify(this.optionsDefault));
      switch (idx) {
        case 0: {
          this.options.push(options);
          break;
        }
        case 1: {
      
          this.options.push(options);
          break;
        }
        case 2: {

          this.options.push(options);
          break;
        }
        case 3: {

          this.options.push(options);
          break;
        }
      }
    }
  }
}


