import { style } from '@angular/animations';
import { Injectable } from '@angular/core';
import { Chart,registerables } from 'chart.js';
import { color } from 'chart.js/helpers';
import { Observable, Subscription } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChartService {
  private myGlobalVariableSubject = new BehaviorSubject<string>('light');
  public myGlobalVariable$ = this.myGlobalVariableSubject.asObservable();
  
    setGlobalVariable(newValue: string) {
      this.myGlobalVariableSubject.next(newValue);
    }
    getGlobalVariable() {
      return this.myGlobalVariableSubject.getValue();
    }
  public temaAtual: any;
  labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  newchart(chartname:any,types?:any,legend?:boolean){
    return new Chart(chartname,{
      type: types||'line',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: 'Vendas Por Dia',
            data: [1,2,3,4,15,6,37,8,59,10,15,12],
            fill: true
          }
        ]
      },
      options:{
        plugins:{
          legend:{
            display:legend?true:false
          },
          colors:{
            enabled:true
          },
          title: {
            display: true,
            text: 'Custom Chart Title'
          },
          zoom: {
            zoom: {
              wheel: {
                enabled: true,
              },
              pinch: {
                enabled: true
              },
              mode: 'xy',
              drag:true
            },
            pan: {
              enabled: true,
              mode: 'x',
              rangeMin: {
                x: null,
                y: null
              },
              rangeMax: {
                x: null,
                y: null
              },
              speed: 20,
              threshold: 10,
            },
          }
        },
        scales: {
          x: {
              display: legend?true:false // Hides labels and chart lines of the x-axis
          },
          y:{
            display:true
          }
        },
        maintainAspectRatio: false,
        elements: {
          line: {
            tension: 0.4
          },
          point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 4,
            hoverBorderWidth: 3
          }
        }
      }
    })
  }
  public colorChartX = 'white'
  newchart1(chartname:any,chartContext:any,tipoGrafico:any){
    let tituloGrafico:any
    let corFundoGrafico:any
    let displayLeganda:any
    let displayX=true
    let displayGridX=true
    let displayY=true
    let displayGridY=true
    let paddingBottom = 0
    let paddingTop = 0
    let typeChart:any='line'
    let legendPosition:any = 'top'
    let borderRad = 0
    let corVerde = '#00ff26'
    let corAzul = '#7CBCCB'

    switch(tipoGrafico){
      case 'faturamento':
        tituloGrafico = 'Faturamento'
        displayLeganda = true
        displayX = false
        displayY = false
        paddingBottom = 20
        corFundoGrafico = chartContext.createLinearGradient(0, 0, 0, 200);
        corFundoGrafico.addColorStop(0,'rgba(255, 255, 255, 1)'); // Branco no topo
        corFundoGrafico.addColorStop(1,'rgba(255, 255, 255, 0)'); // Transparente na base
        break;
      case 'vendasPorProduto':
        tituloGrafico = 'Vendas Por Produto'
        displayGridY = false
        corFundoGrafico = chartContext.createLinearGradient(0, 0, 0, 700);
        corFundoGrafico.addColorStop(0,corAzul); 
        corFundoGrafico.addColorStop(1,'rgba(0,0,0,0)'); 
        break;
      case 'estoqueProduto':
        tituloGrafico = 'Estoque do Top 10'
        typeChart = 'pie'
        displayX = false
        displayY = false
        legendPosition = 'bottom'
        break;
      case 'chartMotoboy':
        tituloGrafico = 'Produtividade Motoboy'  
        typeChart = 'line'
        displayGridY = false
        corFundoGrafico = chartContext.createLinearGradient(0, 0, 0, 700);
        corFundoGrafico.addColorStop(0,corVerde); 
        corFundoGrafico.addColorStop(1,'rgba(0,0,0,0)'); 
        break
      case 'vendasPorOrigem':
        tituloGrafico = 'Vendas Por Origem'
        typeChart = 'bar'
        displayGridX = false
        borderRad = 5
        corFundoGrafico = chartContext.createLinearGradient(0, 0, 0, 700);
        corFundoGrafico.addColorStop(0,corVerde);
        corFundoGrafico.addColorStop(1,'rgba(0,0,0,0)'); 
    }
    return new Chart(chartname,{
      type: typeChart,
      data: {
        labels: this.labels,
        datasets: [
          {
            label: 'Vendas Por Dia',
            data: [1,2,3,4,15,6,37,8,59,10,15,12],
            fill: true,
            backgroundColor:corFundoGrafico,
            borderRadius: borderRad,
            color:'white'
          }
        ]
      },
      options:{
        plugins:{
          legend:{
            display:displayLeganda||true,
            position: legendPosition,
          },
          colors:{
            enabled:true
          },
          title: {
            display: true,
            text: tituloGrafico
          },
          zoom: {
            zoom: {
              wheel: {
                enabled: true,
              },
              pinch: {
                enabled: true
              },
              mode: 'xy',
            },
            pan: {
              enabled: true,
              mode: 'x',
            },
          }
        },
        scales: {
          x: {
              display:displayX , // Hides labels and chart lines of the x-axis
              grid:{
                display:displayGridX
              },
              ticks: {
                color: 'black'
              }
            },
          y:{
              display:displayY,
              grid:{
                display:displayGridY
              },
              ticks: {
                color: 'black'
              }
          }
        },
        maintainAspectRatio: false,
        elements: {
          line: {
            tension: 0.4
          },
          point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 4,
            hoverBorderWidth: 3
          }
        },
        layout:{
          padding:{
            bottom:paddingBottom,
            top:paddingTop
          }
        }
      }
    })
  }
  colorChart(
    chart:any,
    context:any,
    corInicial?:any,
    corFinal?:any,
    height?:any 
  ) {
      var gradientFill = context.createLinearGradient(0, 0, 0, height||150);
      gradientFill.addColorStop(0, corInicial || 'rgba(255, 255, 255, 1)'); // Branco no topo
      gradientFill.addColorStop(1, corFinal || 'rgba(255, 255, 255, 0)'); // Transparente na base
      
      chart.data.datasets[0].backgroundColor = gradientFill
      chart.data.datasets[0].borderColor = 'white'
  }
  updateChartData(chart:any,data:(string|number)[][]){
    chart.data.labels=[]
    chart.data.datasets[0].data=[]
    data.forEach(e => {
      chart.data.labels.push(e[0])
      chart.data.datasets[0].data.push(e[1])
    });
    return chart
  }
  constructor() { }  
}
