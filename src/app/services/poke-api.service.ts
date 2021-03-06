import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  baseUrl = 'https://pokeapi.co/api/v2';
  imageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

  constructor(private http: HttpClient) { }

  getPokemon(pokeIndex,limit) {
    // pokeIndex = 0;
    return this.http.get(`${this.baseUrl}/pokemon?offset=${pokeIndex}&limit=${limit}`).pipe(
      map(result => {
        console.log(result);
        return result['results'];
      }), map(pokemon => {
        return pokemon.map((poke, index) => {
          poke.image = this.getPokeImage(pokeIndex + index + 1);
          poke.pokeindex = pokeIndex + index + 1;
          return poke;
        });
      })
    );
  }
  getPokeImage(index) {
    return `${this.imageUrl}${index}.png`;
  }

  getPokeInfo(index) {
    return this.http.get(`${this.baseUrl}/pokemon/${index}`).pipe(
      map(poke => {
        const sprites = Object.keys(poke['sprites']);
        poke['images'] = sprites
          .map(spriteKey => poke['sprites'][spriteKey])
          .filter(img => img);
        return poke;
      })
    );
  }


  

}
