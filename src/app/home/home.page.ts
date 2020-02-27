import { Component,OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { PokeApiService } from '../services/poke-api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  
  pokeIndex = 0;
  pokeList = [];

  @ViewChild(IonInfiniteScroll,{static: false}) infinite:IonInfiniteScroll

  constructor(private pokeService: PokeApiService) {}
  ngOnInit(): void {
    this.fetchPoke();
  }

  fetchPoke(showPoke = false, event?){
    if(showPoke){
      this.pokeIndex +=25;
    }
    this.pokeService.getPokemon(this.pokeIndex).subscribe(
      res=>{
        this.pokeList = [...this.pokeList, ...res]
        console.log(this.pokeList);

        if (event) {
          event.target.complete();
        }
   
      }
    )
  }

}
