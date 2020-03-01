import {
  PokeApiService
} from './../services/poke-api.service';
import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';
import {
  Chart
} from 'chart.js';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {
  @ViewChild('barChart', {
    static: false
  }) barChart;

  pokeInfo;
  bars;
  graphLabels = [];
  graphDataSet = [];

  constructor(private pokeServ: PokeApiService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getPokeData();
    // this.createBarChart();
  }


  ionViewDidEnter() {
    this.createBarChart();
  }

  ionViewWillEnter() {
    this.createBarChart();
  }

  getPokeData() {
    const index = this.route.snapshot.paramMap.get('index');
    this.pokeServ.getPokeInfo(index).subscribe(
      res => {
        this.pokeInfo = res;
        console.log(this.pokeInfo.stats);
        for (let i = 0; i < this.pokeInfo.stats.length; i++) {
          this.graphLabels.push(this.pokeInfo.stats[i].stat.name);
          this.graphDataSet.push(this.pokeInfo.stats[i].base_stat);
        }
        console.log(this.graphLabels);
      }
    );
  }

  createBarChart() {


   this.bars = new Chart(this.barChart.nativeElement, {
      type: 'radar',
      data: {
      labels: this.graphLabels,
      datasets : [{
        label: 'Stats',
        backgroundColor: 'rgba(200,0,0,0.2)',
        data: this.graphDataSet
      }]
    },
      options: {     }
    });

  }
}
