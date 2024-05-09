import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { GET_POKEMON, GET_POKEMON_COUNT, GET_POKEMON_DATA } from './graphql.operations';
import { NgIf, NgFor } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog'
import { ModalComponent } from './modal.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, NgFor, MatTableModule, ReactiveFormsModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  columnsToDisplay = ["pokemonName", "pokemonHeight", "pokemonWeight"];
  loading: boolean = true;
  attributeSet: boolean = false;
  pokemon : any [] = [];
  profileForm: FormGroup;
  numberValue: number = 0;
  count: number = 0;
  lastPage:number = 0;
  pokemonId: number = 0;
  pokemonData: any = [];
  limit:number = 10;
  offset:number= 0;

  currentPage:number = 1;
  
  

  constructor(private apollo: Apollo, private dialogRef: MatDialog) {
    ;
    this.profileForm = new FormGroup({
      limit: new FormControl<number>(10),
    });
    this.getPokemonCount();
  }
  ngOnInit() {
    this.getPokemon();
    
  }
  async viewPokemon(pokemon: any) {
    this.pokemonId = pokemon.id;
    this.getPokemonData();
  }


  handleSubmit() {
    this.limit = Math.max(this.profileForm.value.limit, 1);
    this.lastPage = Math.ceil(this.count / this.limit)
    this.currentPage = 1;
    this.offset = 0;
    this.getPokemon();
    
  }

  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.offset = ((this.currentPage - 1) * this.limit);
    this.getPokemon();
  }
  
  getPokemon() {
    this.apollo.watchQuery ({
      query: GET_POKEMON,
      variables : {
        limit: this.limit,
        offset: this.offset,
      }
    }).valueChanges.subscribe(({data, error}: any) =>{
      this.loading = false;
      this.pokemon = data.pokemon;
    })
  }

  getPokemonCount() {
    this.apollo.watchQuery ({
      query: GET_POKEMON_COUNT,
    }).valueChanges.subscribe(({data, error}: any) =>{
      this.count = data.pokemon_v2_pokemon_aggregate.aggregate.count;
      this.lastPage = Math.ceil(this.count / this.limit)
    })
  }


  getPokemonData() {
    this.apollo.watchQuery ({
      query: GET_POKEMON_DATA,
      variables : {
        id: this.pokemonId,
      }
    }).valueChanges.subscribe(({data, error}: any) =>{
      this.pokemonData = data.specificPokemon[0];
      this.attributeSet = true;
      this.openModal();
     
    })
  }
  
  openModal() {
    const dialogRef = this.dialogRef.open(ModalComponent, {
      data: this.pokemonData 
    });
  }

  closeModal() {
    this.dialogRef.closeAll();
  }

}
