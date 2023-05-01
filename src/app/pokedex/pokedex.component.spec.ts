import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { PokedexComponent } from './pokedex.component';
import {
  initialPokemonState,
  PokemonState,
} from '../store/pokemon-store/pokemonState';
import { Pokemon } from '../definitions/pokemon';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PokedexComponent', () => {
  let store: MockStore<{ pokemons: PokemonState }>;
  const initialState = { pokemons: initialPokemonState };

  let component: PokedexComponent;
  let fixture: ComponentFixture<PokedexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokedexComponent],
      providers: [provideMockStore({ initialState })],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PokedexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the loading message when the loading state is true', () => {
    store.setState({
      pokemons: {
        ...initialPokemonState,
        isLoading: true,
      },
    });

    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector('.pokemon-state--loading')?.textContent
    ).toContain('Loading pokemons, please wait...');
  });

  it('should display the error section in case of error', () => {
    store.setState({
      pokemons: {
        ...initialPokemonState,
        error: 'Something went wrong',
      },
    });

    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const loadingContent = compiled.querySelector('.pokemon-state--loading');
    const errorContent = compiled.querySelector('.pokemon-state--error');

    expect(loadingContent).toBeNull();
    expect(errorContent?.textContent).toContain(
      `An error occured, we cannot display pokemons right now. Please try again later. Details: Something went wrong`
    );
  });

  it('should display the list of pokemons when it is loaded', () => {
    store.setState({
      pokemons: {
        ...initialPokemonState,
        items: [{} as Pokemon, {} as Pokemon],
      },
    });

    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const loadingContent = compiled.querySelector('.pokemon-state--loading');
    const errorContent = compiled.querySelector('.pokemon-state--error');
    const listContent = compiled.querySelector('.pokedex__container__items');

    expect(loadingContent).toBeNull();
    expect(errorContent).toBeNull();
    expect(listContent?.children).toHaveLength(2);
  });
});
