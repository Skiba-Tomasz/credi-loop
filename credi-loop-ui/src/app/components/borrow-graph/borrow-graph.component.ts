import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LenderBoardRecord } from '../../services/dto/lenderboard.dto';

@Component({
  selector: 'app-borrow-graph',
  templateUrl: './borrow-graph.component.html',
  styleUrl: './borrow-graph.component.scss'
})
export class BorrowGraphComponent implements AfterViewInit, OnInit {
  @Input() data$!: Observable<LenderBoardRecord[]>;
  @Input() initialData!: LenderBoardRecord[];

  chartOptions: any = {};
  labelColor: any = {};
  borderColor: any = {};
  baseColor: any = {};
  baseLightColor: any = {};
  secondaryColor: any = {};

  constructor() {}

  ngOnInit(): void {
    this.data$?.subscribe((data) => {
      if(data){
        this.chartOptions = this.getChartOptions();
      }
      
    });
  }

  ngAfterViewInit() {
    this.labelColor = "#FFFFFF";
    this.borderColor = "#000000";
    this.baseColor = "#8e009c";
    this.baseLightColor = "#008b62";
    this.secondaryColor = "#0000FF";
    this.chartOptions = this.getChartOptions();
  }

  getCssValue(variableName: string): string {
    const style = getComputedStyle(document.body);
    return style.getPropertyValue(variableName).trim();
  }

  getChartOptions() {
    return {
      series: [
        {
          name: 'Borrow Amount',
          type: 'area',
          data: [500, 1200, 1300],
        },
        {
          name: 'Borrow APY',
          type: 'line',
          data: [5.5, 6, 5.1],
        }
      ],
      chart: {
        height: 350,
        type: 'line',
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
        selection: {
          enabled: false,
        },
      },
      legend: {
        labels: {
          colors: this.labelColor,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
        show: true,
      },
      xaxis: {
        categories: [
          '2024-08-28',
          '2024-09-01',
          '2024-09-03',
        ],
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          style: {
            colors: this.labelColor,
            fontSize: '12px',
          },
        },
      },
      yaxis: [
        {
          decimalsInFloat: 2,
          title: {
            text: 'Volume',
            style: {
              color: this.labelColor,
              fontSize: '12px',
            },
          },
          labels: {
            style: {
              colors: this.labelColor,
              fontSize: '12px',
            },
          },
        },
        {
          decimalsInFloat: 2,
          opposite: true,
          title: {
            text: 'Apy',
            style: {
              color: this.labelColor,
              fontSize: '12px',
            },
          },
          labels: {
            style: {
              colors: this.labelColor,
              fontSize: '12px',
            },
          },
        },
      ],
      fill: {
        type: 'solid',
        opacity: [0.5, 0.5, 1],
      },
      states: {
        active: {
          allowMultipleDataPointsSelection: false,
          filter: {
            type: 'none',
            value: 0,
          },
        },
      },
      tooltip: {
        cssClass: 'chart-tooltip',
        style: {
          fontSize: '12px',
        },
        y: {
          formatter: function (val: number) {
            return '%' + val;
          },
        },
      },
      colors: [this.baseColor, this.baseLightColor],
      grid: {
        borderColor: this.borderColor,
        strokeDashArray: 4,
        yaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
      },
    };
  }
}
