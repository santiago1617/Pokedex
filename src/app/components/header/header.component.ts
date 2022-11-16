import { NONE_TYPE } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/api';
import { Observable, throwError } from 'rxjs';
import { Pokemon, PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  items: MenuItem[]=[];
  types: Array<any>=[];
  selection: Array<any>;
  pokemones: Array<any>=[];
  filterBool$: Observable<Boolean>;
 
  constructor(private router: Router, private pokeService: PokemonService) { 
    this.filterBool$= pokeService.SharingFilterObservable;
    this.selection=[
      {
        option: "Elementos",
        wasSelected: false,
        items:this.types
      },
      {
        option: "Orden Alfabetico",
        wasSelected:false
      },
      {
        option: "Sin orden",
        wasSelected:false
      }
    ];
  }
  

  ngOnInit() {
    this.getTypes();
    this.madeMenuList();
    for(let i=1;i<60;i++){
      this.fillPokeInformation(i+"");
    }
    
    this.pokeService.SharingListObservableData=this.pokemones;
}

capitalize(cadena:string){
  let lower=cadena.toLowerCase();
  return cadena.charAt(0).toUpperCase()+lower.slice(1);
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
        name:this.capitalize(res.name),
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
    }
  );
}


getTypes(){
  this.pokeService.getTypes().subscribe(
    res=> {
      for(let json of res.results){
        let type={
        label:json.name,
        icon: this.getIcon(json.name)
        }
        this.types.push(type);
      }
      
    },
    err=> {

    }
  );
}



  getIcon(name:string){
    switch(name){
      case "fighting":
        return "fa-solid fa-hand-fist";
      case "flying":
        return "fa-solid fa-dove";
      case "poison":
      return "fa-solid fa-skull-crossbones";
      case "ground":
        return "fa-solid fa-earth-americas";
      case "rock":
        return "fa-solid fa-hill-rockslide";
      case "bug":
        return "fa-solid fa-spider";
      case "ghost":
        return "fa-solid fa-ghost";
      case "steel":
        return "fa-brands fa-ethereum";
      case "fire":
        return "fa-solid fa-fire";
      case "water":
        return "fa-solid fa-droplet";
      case "grass":
        return "fa-solid fa-seedling";
      case "electric":
        return "fa-solid fa-bolt";
      case "psychic":
        return "fa-regular fa-moon";
      case "ice":
        return "fa-solid fa-dice-d6";
      case "dragon":
        return "fa-solid fa-dragon";
      case "dark":
        return "fa-solid fa-circle-half-stroke";
      case "shadow":
        return "fa-solid fa-cloud";
      case "fairy":
        return "fa-solid fa-wand-sparkles";
      default:
        return "fa-solid fa-paw"
    }

  }
  madeMenuList(){
    this.items = [
      {
         label:'Elementos',
         icon:'pi pi-bolt',
         items:this.types
        
        },
        {
          label:'Orden Alfabetico',
         icon:'fa-solid fa-arrow-down-a-z',
        },
        {
          label:'Sin orden',
         icon:'fa-solid fa-tornado',
        }
        ];
  }
  goHome(){
    this.pokeService.SharingListObservableData=this.pokemones;
    this.pokeService.SharingFilterObservableData=true;
    this.router.navigateByUrl("/home");
  }





  optionOperation(cadena:string){
    let isOption=this.isItOption(cadena);

    if(!isOption){
      console.log("DENTRO DE NO ES OPCIONNNNN")
      let element=this.getElement(cadena);
      let pokeList:Array<Pokemon>=[];
      for(let poke of this.pokemones){
        if(poke.types.includes(element)){
          pokeList.push(poke);
        }
      }
      this.pokeService.SharingListObservableData=pokeList;
    }
    else{
      let option=this.getOption(cadena);
      switch(option){
        case "Sin orden":

          this.pokeService.SharingListObservableData=this.pokemones;
          break;
        case "Orden Alfabetico":
          let poke:Array<Pokemon>=this.pokemones.slice();  
          poke.sort(this.pokeService.SortArray);
          this.pokeService.SharingListObservableData=poke;

        break;
      }
    }

  }
  getElement(cadena:string){
    let elements=this.selection[0].items;
    for(let element of elements){
      if(cadena.includes(element.label)) return element.label;
    }
    throw new Error("No se encontro este elemento en el innerHTML");
  }
  /**
   * Este metodo obtiene el nombre de la opcion seleccionada
   * @param cadena esta es la cadena innerHTML obtenida por el evento de cliquear el menu
   */
  getOption(cadena: string){
    let options=this.selection;
    for(let option of options){
      console.log(option);
      if(cadena.includes(option.option)) return option.option;
    }
    throw new Error("No se encontro esta Opcion principal en el innerHTML");
  }
  
  /** 
   * Este metodo retorna si el elemnto elegido en el menu es una opcion principal como "Elementos" y "Ordenar Alfabeticamente"
   * y les asigna el valor de true al atributo .wasSelected
   * @param cadena esta es la cadena innerHTML obtenida por el evento de cliqueqar el menu
  */
  isItOption(cadena:string){
    let isOption=false;
    for(let json of this.selection){
      isOption=isOption || (cadena.includes(json.option));
      if(isOption) json.wasSelected=true;
    }
    return isOption;
  }

  filter(event:any){
    
    let cadena=event.target.innerHTML;
    this.optionOperation(cadena);
  }

}
