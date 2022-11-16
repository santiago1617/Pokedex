import { Component, ComponentFactoryResolver, Input, OnInit } from '@angular/core';
import { first, Observable } from 'rxjs';
import { Pokemon, PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {
 data$: Observable<Pokemon>;
 firstType:string="";
 public pokemon: any={name:"hola",};

  constructor(private service: PokemonService) { 
    this.data$=service.SharingObservable;
    
  }

  ngOnInit(): void {
    
    this.service.SharingFilterObservableData=false;
    /*this.service.trigger.subscribe(pokemon=>{
      console.log("DENTRO DEL TRIGGER RECIBIENDO");
      this.pokemon=pokemon;
      console.log("OnInit");
      console.log(this.pokemon);
    });*/
    
  }
  ngOnChanges() {
    console.log(`ngOnChanges `);
  }
  ngDoCheck() {
    console.log('ngDoCheck');
    console.log(this.pokemon);
  }
  ngAfterContentInit() {
    console.log('ngAfterContentInit');
    console.log(this.pokemon);
  }
  ngAfterContentChecked() {
    console.log('ngAfterContentChecked');
    console.log(this.pokemon);
  }
  ngAfterViewInit() {
    console.log('ngAfterViewInit');
    console.log(this.pokemon);
  }
  ngAfterViewChecked() {
    console.log('ngAfterViewChecked');
    console.log(this.pokemon);
  }
  ngOnDestroy() {
    console.log('ngOnDestroy');
  }

}
