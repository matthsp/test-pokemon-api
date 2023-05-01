import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import {
  initialPokemonState,
  PokemonState,
} from '../store/pokemon-store/pokemonState';
import { PokemonDetailComponent } from './pokemon-detail.component';
import { MockActivatedRoute } from '../utils/mock-activated-route';
import { PokemonNumberPipe } from '../pokedex/pipes/pokemon-number.pipe';
import { PokemonDetail } from '../definitions/pokemon';

describe('PokemonDetailComponent', () => {
  let store: MockStore<{ pokemons: PokemonState }>;
  const initialState = { pokemons: initialPokemonState };
  const activatedRoute = new MockActivatedRoute();

  let fixture: ComponentFixture<PokemonDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonDetailComponent, PokemonNumberPipe],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: ActivatedRoute,
          useValue: activatedRoute,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    const paramMap = new Map();
    paramMap.set('name', 'missingNo');
    activatedRoute.testParams = paramMap;

    fixture = TestBed.createComponent(PokemonDetailComponent);
    fixture.detectChanges();

    store = TestBed.inject(MockStore);
  });

  it('should display the loading message', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    store.setState({
      pokemons: {
        ...initialPokemonState,
        isLoading: true,
      },
    });
    fixture.detectChanges();

    const loadingContent = compiled.querySelector('.pokemon-state--loading');
    expect(loadingContent?.textContent).toContain(
      'Please wait, we are loading data for this pokemon'
    );
  });

  it('should display the error message', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    store.setState({
      pokemons: {
        ...initialPokemonState,
        error: 'Sooo sad',
      },
    });
    fixture.detectChanges();

    const loadingContent = compiled.querySelector('.pokemon-state--loading');
    const content = compiled.querySelector('.pokemon-state--error');
    expect(loadingContent).toBeFalsy();
    expect(content?.textContent).toContain(
      'An error occured while fetching data: Sooo sad'
    );
  });

  describe('for a pokemon withou evolutions', () => {
    const pokemon = {
      name: 'missingNo',
      id: '666',
      height: 25,
      weight: 0,
      types: [{ type: { name: 'flying' } }, { type: { name: 'dragon' } }],
      sprites: {
        other: { 'official-artwork': { front_default: 'img.url' } },
      },
      species: {
        flavor_text_entries: [
          {
            flavor_text: 'Much flavor, such wow',
            language: { name: 'en' },
          },
        ],
        evolution_chain: {
          chain: {
            evolves_to: [],
            species: {
              name: 'missingNo',
            },
          },
        },
      },
    } as unknown as PokemonDetail;

    it('should display the header', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      store.setState({
        pokemons: {
          ...initialPokemonState,
          detail: pokemon,
        },
      });
      fixture.detectChanges();

      const titleContent = compiled.querySelector(
        '.pokemon-detail__header__title'
      );
      const subtitleContent = compiled.querySelector(
        '.pokemon-detail__header__subtitle'
      );
      expect(titleContent?.textContent).toContain('missingNo');
      expect(subtitleContent?.textContent).toContain('#0666');
    });

    it('should display the img', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      store.setState({
        pokemons: {
          ...initialPokemonState,
          detail: pokemon,
        },
      });
      fixture.detectChanges();

      const imgContent = compiled.querySelector(
        '.pokemon-detail__container__sprite'
      );
      expect(imgContent?.getAttribute('src')).toBe('img.url');
    });

    it('should display the flavor text', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      store.setState({
        pokemons: {
          ...initialPokemonState,
          detail: pokemon,
        },
      });
      fixture.detectChanges();

      const imgContent = compiled.querySelector(
        '.pokemon-detail__container__misc__description'
      );
      expect(imgContent?.textContent).toContain('Much flavor, such wow');
    });

    it('should display the height and weight text', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      store.setState({
        pokemons: {
          ...initialPokemonState,
          detail: pokemon,
        },
      });
      fixture.detectChanges();

      const miscContent = compiled.querySelector(
        '.pokemon-detail__container__misc__characteristics'
      );
      expect(miscContent?.children).toHaveLength(2);
      expect(miscContent?.children[0]?.textContent).toContain('Height: 2.5m');
      expect(miscContent?.children[1]?.textContent).toContain('Weight: 0kg');
    });

    it('should display the types text', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      store.setState({
        pokemons: {
          ...initialPokemonState,
          detail: pokemon,
        },
      });
      fixture.detectChanges();

      const miscContent = compiled.querySelectorAll(
        '.pokemon-detail__container__misc__types__type'
      );
      expect(miscContent).toHaveLength(2);
      expect(miscContent[0]?.textContent).toContain('flying');
      expect(miscContent[1]?.textContent).toContain('dragon');
    });

    it('should not display evolutions', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      store.setState({
        pokemons: {
          ...initialPokemonState,
          detail: pokemon,
        },
      });
      fixture.detectChanges();

      const miscContent = compiled.querySelector(
        '.pokemon-detail__container__misc__evolutions'
      );
      expect(miscContent).toBeFalsy();
    });
  });
  describe('for a pokemon withou evolutions', () => {
    const pokemon = {
      name: 'missingNo',
      id: '666',
      height: 25,
      weight: 0,
      types: [{ type: { name: 'flying' } }, { type: { name: 'dragon' } }],
      sprites: {
        other: { 'official-artwork': { front_default: 'img.url' } },
      },
      species: {
        flavor_text_entries: [
          {
            flavor_text: 'Much flavor, such wow',
            language: { name: 'en' },
          },
        ],
        evolution_chain: {
          chain: {
            evolves_to: [
              {
                evolves_to: [],
                species: {
                  name: 'foundNo',
                },
              },
              {
                evolves_to: [],
                species: {
                  name: 'unfinity',
                },
              },
            ],
            species: {
              name: 'missingNo',
            },
          },
        },
      },
    } as unknown as PokemonDetail;

    it('should display the evolutions', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      store.setState({
        pokemons: {
          ...initialPokemonState,
          detail: pokemon,
        },
      });
      fixture.detectChanges();

      const titleContent = compiled.querySelector(
        '.pokemon-detail__container__misc__evolutions__title'
      );
      const linksContent = compiled.querySelectorAll(
        '.pokemon-detail__container__misc__evolutions__link'
      );
      expect(titleContent?.textContent).toContain('Evolutions');
      expect(linksContent).toHaveLength(2);
      expect(linksContent[0]?.textContent).toContain('foundNo');
      expect(linksContent[1]?.textContent).toContain('unfinity');
    });
  });
});
