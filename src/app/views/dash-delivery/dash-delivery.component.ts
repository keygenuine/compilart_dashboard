import { NgModule } from '@angular/core';
import { NgFor } from '@angular/common';
import { DOCUMENT, NgStyle } from '@angular/common';
import { AfterViewInit, Component, DestroyRef, effect, inject, OnInit, Renderer2, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import Chart from 'chart.js/auto';
import { getRelativePosition } from 'chart.js/helpers';
import { ChartOptions,
  ScaleOptions } from 'chart.js';
import { ViewChild } from '@angular/core';
import { Colors } from 'chart.js';
import { DeepPartial } from 'chart.js/dist/types/utils';
import { getStyle, hexToRgba } from '@coreui/utils';
import { ElementRef } from '@angular/core';
import { CardModule } from '@coreui/angular';
import zoomPlugin from 'chartjs-plugin-zoom';
import {
  AvatarComponent,
  ButtonDirective,
  ButtonGroupComponent,
  CardBodyComponent,
  CardComponent,
  CardFooterComponent,
  CardHeaderComponent,
  ColComponent,
  FormCheckLabelDirective,
  GutterDirective,
  ProgressBarDirective,
  ProgressComponent,
  RowComponent,
  TableDirective,
  TextColorDirective
} from '@coreui/angular';
import { ContainerComponent } from '@coreui/angular';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { IconDirective } from '@coreui/icons-angular';
import { WidgetsDropdownComponent } from '../widgets/widgets-dropdown/widgets-dropdown.component';
// import { DashboardChartsData, IChartProps } from './dashboard-charts-data';
import {ChartService} from './../../chart.service'
import { BaseChartDirective } from 'ng2-charts';
import { Tabs2Module } from '@coreui/angular';
import { ColorModeService } from '@coreui/angular';
import { Subscription } from 'rxjs';
import { textChangeRangeIsUnchanged } from 'typescript';
@Component({
  selector: 'app-dash-delivery',
  standalone: true,
  imports: [CardModule,Tabs2Module,NgFor,BaseChartDirective,ContainerComponent,WidgetsDropdownComponent, TextColorDirective, CardComponent, CardBodyComponent, RowComponent, ColComponent, ButtonDirective, IconDirective, ReactiveFormsModule, ButtonGroupComponent, FormCheckLabelDirective, ChartjsComponent, NgStyle, CardFooterComponent, GutterDirective, ProgressBarDirective, ProgressComponent, CardHeaderComponent, TableDirective, AvatarComponent],
  templateUrl: './dash-delivery.component.html',
  styleUrl: './dash-delivery.component.scss'
})
export class DashDeliveryComponent implements OnInit,AfterViewInit {
  bankname = [1, 18, 9, 171, 34, 22, 11]
  private chartFaturamentoDelivery : any
  private chartMotoboy : any
  private chartBairros : any
  private vendasPorProdutoChartDelivery:any
  private estoqueProdutoChartDelivery:any
  private chartVendasPorOrigemDelivery:any
  @ViewChild('chartFaturamentoDeliveryRef') chartFaturamentoDeliveryRef!: ElementRef;
  @ViewChild('chartMotoboyRef') chartMotoboyRef!: ElementRef;
  @ViewChild('chartBairrosRef') chartBairrosRef!: ElementRef;
  @ViewChild('vendasPorProdutoChartDeliveryRef') vendasPorProdutoChartDeliveryRef!: ElementRef;
  @ViewChild('estoqueProdutoChartDeliveryRef') estoqueProdutoChartDeliveryRef!: ElementRef;
  @ViewChild('chartVendasPorOrigemDeliveryRef') chartVendasPorOrigemDeliveryRef!: ElementRef;
  getContext(chartRef:any){
    let canvas : HTMLCanvasElement = chartRef.nativeElement;
    let context : CanvasRenderingContext2D | null = canvas.getContext('2d')
    return  context
  }
  data = [['20',30],['21',35],['22',37],['23',60]]
  jsonServer = {
    listaDeProdutos : [
      {produto:'refrigerante',custo:200,venda:200,id:1},
      {produto:'agua',custo:1010,venda:2001,id:5},
      {produto:'coca-cola',custo:110,venda:201,id:104},
      {produto:'refeições',custo:1500,venda:4000,id:86},
      {produto:'sucos',custo:100,venda:800,id:88},
    ]
  }
  scroll(el: any) { 
    el.scrollIntoView({ behavior: "smooth" ,block: "start"}); 
        // Calcula a posição atual de rolagem e ajusta para cima em 100px
        const offset = 150;
        const currentScrollTop = window.pageYOffset;
        const elementRect = el.getBoundingClientRect();
        const elementTop = elementRect.top + currentScrollTop;
        const newScrollTop = elementTop - offset;
    
        // Ajusta a posição do scroll para cima em 100px
        window.scrollTo({
            top: newScrollTop,
            behavior: "smooth"
        });
} 
  produtoGraficoGrupo(produtos:any){
    if(window.innerWidth<800){
      this.scroll(document.querySelector('#graficoGrupoScroll'))
    }
    // window.scrollTo(0, 0) 

    this.vendasPorProdutoChartDelivery.data.datasets[0].label=[produtos]
    this.vendasPorProdutoChartDelivery.data.datasets[0].data=[100,20,44,4,15,0,7,8,159,10,15,12]
    this.vendasPorProdutoChartDelivery.update()
  }
  ngAfterViewInit(): void {
    Chart.register(Colors)
    Chart.register(zoomPlugin)
    this.chartFaturamentoDelivery=this.chartService.newchart1('chartFaturamentoDelivery',this.getContext(this.chartFaturamentoDeliveryRef),'faturamento')
    this.vendasPorProdutoChartDelivery = this.chartService.newchart1('vendasPorProdutoChartDelivery',this.getContext(this.vendasPorProdutoChartDeliveryRef),'vendasPorProduto')
    this.estoqueProdutoChartDelivery = this.chartService.newchart1('estoqueProdutoChartDelivery',this.getContext(this.estoqueProdutoChartDeliveryRef),'estoqueProduto')
    this.chartMotoboy = this.chartService.newchart1('chartMotoboy',this.getContext(this.chartMotoboyRef),'chartMotoboy')
    this.chartVendasPorOrigemDelivery = this.chartService.newchart1('chartVendasPorOrigemDelivery',this.getContext(this.chartVendasPorOrigemDeliveryRef),'vendasPorOrigem')

    // this.chartMotoboy=this.chartService.newchart('chartMotoboy','bar')
    // this.chartService.colorChart(this.chartMotoboy,this.getContext(this.chartMotoboyRef),'rgb(0, 162, 255)','rgba(151, 151, 151, 0)',750)
    // this.chartMotoboy.options.plugins.title.text = 'Produtividade Motoboy'
    // this.chartMotoboy.options.scales.x.display = true
    // this.chartMotoboy.options.scales.x.grid.display = false
    // this.chartMotoboy.update()

    this.chartBairros=this.chartService.newchart('chartBairros','doughnut')
    this.chartBairros.options.plugins.title.text = 'Vendas Por Bairros'
    this.chartBairros.options.plugins.legend.display =true 
    this.chartBairros.options.plugins.legend.position ='bottom' 

    this.chartBairros.update()


  }
  verTema(){
    console.log(this.chartService.temaAtual)
  }


  private subscription?: Subscription;
  public currentGlobalValue?: string;

  readonly #colorModeService = inject(ColorModeService);
  readonly colorMode = this.#colorModeService.colorMode;

  ngOnInit(): void {
    this.subscription = this.chartService.myGlobalVariable$.subscribe(
      (newValue) => {
        this.onGlobalVariableChange(newValue); // Dispara a função quando a variável mudar

      }
    );
  }
  private onGlobalVariableChange(newValue: string) {
    let cor = 'black'
    if(newValue=='dark'){
      cor = 'white'
    }
    this.chartFaturamentoDelivery.options.scales.x.ticks.color = cor
    this.chartFaturamentoDelivery.update()
    
    this.chartMotoboy.options.scales.x.ticks.color = cor
    this.chartMotoboy.update()

    this.chartBairros.options.scales.x.ticks.color = cor
    this.chartBairros.update()

    this.vendasPorProdutoChartDelivery.options.scales.x.ticks.color = cor
    this.vendasPorProdutoChartDelivery.update()

    this.estoqueProdutoChartDelivery.options.scales.x.ticks.color = cor
    this.estoqueProdutoChartDelivery.update()
  
    this.chartVendasPorOrigemDelivery.options.scales.x.ticks.color = cor
    this.chartVendasPorOrigemDelivery.update()
    

  }

  constructor(private chartService:ChartService){}


}
