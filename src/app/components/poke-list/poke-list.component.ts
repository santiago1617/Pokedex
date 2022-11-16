import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ObjectUnsubscribedError, Observable } from 'rxjs';
import { Pokemon, PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss']
})
export class PokeListComponent implements OnInit {
  pokemones: Array<Pokemon>=[];
  data$: Observable<Array<Pokemon>>;
  lastId=0;
  loadingBool:boolean=true;

  constructor(private pokeService: PokemonService, private spinner: NgxSpinnerService) { 
    this.data$=pokeService.SharingListObservable;
  }

  ngOnInit(): void {
    this.getPokemons();
    this.spinner.show();

  }
  getPokemons(){
    this.pokeService.getPokemons().subscribe(
      res=> {
        /*let i=res.id+"";
        this.fillPokeInformation(i);*/
      },
      err=> {

      }
    );
    
  }
  cargarMas(){
    
    this.data$.subscribe(data => {
      // do stuff with data
      // e.g. this.property = data
      this.pokemones=data;
    });
    let lastId=this.pokemones[this.pokemones.length-1].id
      for(let i=lastId+1;i<lastId+40;i++){
        this.fillPokeInformation(i+"");
      }
      this.pokeService.SharingListObservableData=this.pokemones;
      
  }
  //GETTERS
fillPokeInformation(i:string){
  this.pokeService.getPokemon(i).subscribe(
    res=> {
      let tipos=[];
      for(let type of res.types){
        let tipo=type.type.name;
        tipos.push(tipo);
      }
      let pokemon:Pokemon={
        name:res.name,
        weight:res.weight,
        height:res.height,
        id: res.id,
        stats: res.stats,
        types: tipos,
        firstType:tipos[0],
        image: res.sprites.other["official-artwork"].front_default
      };
      this.pokemones.push(pokemon);
    },
    err=> {
      console.log("Ocurrio un error aAl pedir lo pokemones por ID");
      this.loadingBool=false;
    }
  );
}
  onScroll(){
    this.loadingBool=true;
    console.log("Scrolling.........")
    this.cargarMas();
  }
  
}
