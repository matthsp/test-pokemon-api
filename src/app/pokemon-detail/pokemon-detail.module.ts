import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonDetailComponent } from './pokemon-detail.component';
import { PokedexModule } from '../pokedex/pokedex.module';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [PokemonDetailComponent],
  imports: [CommonModule, PokedexModule, RouterLink],
})
export class PokemonDetailModule {}
