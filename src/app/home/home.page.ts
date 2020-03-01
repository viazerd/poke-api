import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  IonInfiniteScroll
} from '@ionic/angular';
import {
  PokeApiService
} from '../services/poke-api.service';
import {
  Router
} from '@angular/router';
import {
  IonContent
} from '@ionic/angular';
import {
  ModalController
} from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  shoCat = false;
  pokeIndex = 0;
  pokeList = [];
  allPoke = [];
  allPokeInfo = [];
  pokeTypes = [];

  @ViewChild(IonInfiniteScroll, {
    static: false
  }) infinite: IonInfiniteScroll;
  @ViewChild(IonContent, {
    static: false
  }) ionContent: IonContent;

  constructor(private pokeService: PokeApiService, private route: Router, public modalController: ModalController) {}
  ngOnInit(): void {
    this.catchPoke();
    this.getAllPoke();
    this.getAllPokeInfo();

  }

  catchPoke(showPoke = false, event ? ) {


    if (showPoke) {
      this.pokeIndex += 25;
    }

    this.pokeService.getPokemon(this.pokeIndex, 25).subscribe(
      res => {
        this.pokeList = [...this.pokeList, ...res];
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
    this.pokeService.getPokemon(0, 809).subscribe(
      res => {
        this.allPoke = [...this.allPoke, ...res];
      }
    );
  }

  onSearchChange(e) {
    this.scrollTop();
    this.pokeList = [];
    const name = e.target.value.toLowerCase();
    if (name == '') {
      this.pokeList = [];
      this.catchPoke();
    }
    this.allPoke.forEach(
      pokemon => {
        if (pokemon.name.toLowerCase().indexOf(name) > -1) {
          this.pokeList.push(pokemon);
        }
      }
    );
  }
  scrollTop() {
    this.ionContent.scrollToTop(600);

  }

  async getAllPokeInfo() {
    const count = 807;
    for (let index = 1; index < count; index++) {
      await this.pokeService.getPokeInfo(index).subscribe(
        res => {
          this.allPokeInfo.push(res);
        }
      );
    }

  }

  getAllTypes(listofTypes) {
  
    this.shoCat= !this.shoCat;
    for (const poke of listofTypes) {
      if (poke.types.length == 2) {
        this.pokeTypes.push(poke.types[1].type.name);
      } else {
        this.pokeTypes.push(poke.types[0].type.name);

      }

    }

    this.pokeTypes = this.getUnique(this.pokeTypes);
    console.log(this.pokeTypes);
  }

  getUnique(array) {
    const uniqueArray = [];
    for (let i = 0; i < array.length; i++) {
      if (uniqueArray.indexOf(array[i]) === -1) {
        uniqueArray.push(array[i]);
      }
    }
    return uniqueArray
  }

  filterPokeByType(type){
    this.shoCat = !this.shoCat;
    this.scrollTop();
    let data = {}
    this.pokeList =[];
    this.allPokeInfo.forEach(
      pokemon =>{
        if(pokemon.types[0].type.name.toLowerCase().indexOf(type) > -1 ){
          console.log(pokemon);
          // console.log(this.allPoke)
          data  = {name:pokemon.name, url:'',image:pokemon.images[1], pokeindex:pokemon.id}
          this.pokeList.push(data);
          console.log(this.pokeList);
        }
      }
    )
  }

}