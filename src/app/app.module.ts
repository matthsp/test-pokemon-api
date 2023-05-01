import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonService } from './services/pokemon.service';
import { PokemonEffects } from './store/pokemon-store/effects';
import { pokemonReducer } from './store/pokemon-store/reducer';
import { PokedexModule } from './pokedex/pokedex.module';
import { PokemonDetailModule } from './pokemon-detail/pokemon-detail.module';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    EffectsModule.forRoot(PokemonEffects),
    HttpClientModule,
    StoreModule.forRoot({ pokemons: pokemonReducer }),
    PokedexModule,
    PokemonDetailModule,
  ],
  providers: [PokemonService],
  bootstrap: [AppComponent],
})
export class AppModule {}
