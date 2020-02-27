import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { PokeApiService } from '../services/poke-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  pokeIndex = 0;
  pokeList = [];

  @ViewChild(IonInfiniteScroll, {static: false}) infinite: IonInfiniteScroll;

  constructor(private pokeService: PokeApiService, private route: Router) {}
  ngOnInit(): void {
    this.catchPoke();
  }

  catchPoke(showPoke = false, event?) {
    // console.log(showPoke);

    if (showPoke) {
      console.log(showPoke);
      this.pokeIndex += 25;
      console.log(this.pokeIndex)
    }
    this.pokeService.getPokemon(this.pokeIndex).subscribe(
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

}
