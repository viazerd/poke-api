import { PokeApiService } from './../services/poke-api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  pokeInfo;
  

  constructor(private pokeServ: PokeApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getPokeData();
  }

  getPokeData() {
    const index = this.route.snapshot.paramMap.get('index');
    this.pokeServ.getPokeInfo(index).subscribe(
      res => {
        this.pokeInfo = res;
        console.log(this.pokeInfo)
      }
    );
  }

}
