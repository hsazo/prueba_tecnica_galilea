import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
import {MatTableModule} from '@angular/material/table';

@Component ({
    selector: 'modal',
    templateUrl: './app.modal.html',
    styleUrl: './app.component.scss',
    standalone: true,
})

export class ModalComponent{
    pokemonData: any;
    name: string = '';
    height: number = 0;
    weight: number = 0;
    baseExp: number = 0;
    cry: string = '';
    sprite: string = '';
    constructor(
        public dialogRef: MatDialogRef<ModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { 
        this.pokemonData = data;
        this.name = this.pokemonData.name
        this.height = this.pokemonData.height
        this.weight = this.pokemonData.weight
        this.baseExp = this.pokemonData.base_experience
        this.cry = this.pokemonData.pokemon_v2_pokemoncries[0].cries.latest
        this.sprite = this.pokemonData.pokemon_v2_pokemonsprites[0].sprites.front_default
    }

    
    playAudio(): void {
        const audio = new Audio(this.cry);
        audio.play();
    }

    closeModal(): void {
        this.dialogRef.close();
      }
}