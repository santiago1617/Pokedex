import { EventEmitter, Injectable, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
export interface Pokemon{
  name:string,
  weight:number,
  height:number,
  id: number,
  stats: Array<any>,
  types: Array<any>,
  firstType:any,
  image: string
  
}


@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private sharingObservable: BehaviorSubject<Pokemon>= new BehaviorSubject<Pokemon>({name:"default",weight:1,
                                                                                      height:1,
                                                                                      id: 1,
                                                                                      stats: ["stat1"],
                                                                                      types: ["type1"],
                                                                                      firstType:{},
                                                                                      image: "iamgeURL"});
  private sharingListObservable: BehaviorSubject<Array<Pokemon>>=new BehaviorSubject<Array<Pokemon>>([]);
  private sharingFilterObservable: BehaviorSubject<Boolean>= new BehaviorSubject<Boolean>(true);

  pokeURL= environment.pokeURL;
  pokeTypes= environment.pokeTypes;
  pokeColor= environment.pokeColor;

  constructor(private http: HttpClient) { }

  //Observable
  get SharingObservable(){
    return this.sharingObservable.asObservable();
  }
  set SharingObservableData(data: Pokemon){
    this.sharingObservable.next(data);
  }
  //Observable List
  get SharingListObservable(){
    return this.sharingListObservable.asObservable();
  }
  set SharingListObservableData(data: Array<Pokemon>){
    this.sharingListObservable.next(data);
  }
  //Observable Filter
  get SharingFilterObservable(){
    return this.sharingFilterObservable.asObservable();
  }
  set SharingFilterObservableData(data: Boolean){
    this.sharingFilterObservable.next(data);
  }
  


  //the rest
  SortArray(x:Pokemon, y:Pokemon){
    if (x.name < y.name) {return -1;}
    if (x.name > y.name) {return 1;}
    return 0;
  }

  getPokemons(){
    return this.http.get<any>(`${this.pokeURL}/pokemon`)
  }
  getPokemon(i:string){
    return this.http.get<any>(`${this.pokeURL}/pokemon/${i}`)
  }
  getTypes(){
    return this.http.get<any>(`${this.pokeTypes}`)
  }
}
