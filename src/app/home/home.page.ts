import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { PokeApiService } from '../services/poke-api.service';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  pokeIndex = 0;
  pokeList = [];
  allPoke = [];

  @ViewChild(IonInfiniteScroll, {static: false}) infinite: IonInfiniteScroll;
  @ViewChild(IonContent, {static: false}) ionContent: IonContent;

  constructor(private pokeService: PokeApiService, private route: Router) {}
  ngOnInit(): void {
    this.catchPoke();
    this.getAllPoke();

  }

  catchPoke(showPoke = false, event?) {
    console.log(this.pokeIndex);

    if (showPoke) {
      console.log(showPoke);
      this.pokeIndex += 25;
      // console.log(this.pokeIndex)
    }


    this.pokeService.getPokemon(this.pokeIndex, 25).subscribe(
      res => {
        this.pokeList = [...this.pokeList, ...res];
        console.log((this.pokeList.length == 0));
        console.log(this.pokeList);

        if (event) {
          event.target.complete();
        }

      }
    );
  }

  routeToInfo(pokeIndex) {
    const infoRoute = 'info/' + pokeIndex;
    this.route.navigateByUrl(infoRoute);
  }

  getAllPoke() {
    this.pokeService.getPokemon(0, 964).subscribe(
      res => {
        this.allPoke = [...this.allPoke, ...res]
        console.log(this.allPoke);
      }
    );
  }

  onSearchChange(e) {
    this.ionContent.scrollToTop(600);
    this.pokeList = []
    const name = e.target.value.toLowerCase();
    if(name == ''){
      this.pokeList = []
      this.catchPoke();
    }
    this.allPoke.forEach(
      pokemon =>{
        if(pokemon.name.toLowerCase().indexOf(name) > -1){
          this.pokeList.push(pokemon);
        }
      }
    )
  }


}
