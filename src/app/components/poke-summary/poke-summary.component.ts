import { Component, OnInit , Input} from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Pokemon, PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-poke-summary',
  templateUrl: './poke-summary.component.html',
  styleUrls: ['./poke-summary.component.scss']
})
export class PokeSummaryComponent implements OnInit {
  
  @Input() pokemon: any={};
  loaded=false;

  constructor(private router: Router,private service: PokemonService) { 
    
  }

  ngOnInit(): void {
    setInterval(()=>{
      this.loaded=true;
    },2000);
  }
  goDetail(){
    //this.service.trigger.emit(this.pokemon);
    let poke:Pokemon={
      name:this.pokemon.name,
      weight:this.pokemon.weight,
      height:this.pokemon.height,
      id: this.pokemon.id,
      stats: this.pokemon.stats,
      types: this.pokemon.types,
      firstType:this.pokemon.firstType,
      image: this.pokemon.image
    };
    this.service.SharingObservableData=poke;
    
    
    this.router.navigateByUrl("/pokemonDetail/:"+this.pokemon.id);
    
  }

}
