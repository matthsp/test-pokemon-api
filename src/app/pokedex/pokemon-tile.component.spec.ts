import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonTileComponent } from './pokemon-tile.component';
import { PokemonNumberPipe } from './pipes/pokemon-number.pipe';
import { Pokemon } from '../definitions/pokemon';

describe('PokemonTileComponent', () => {
  let component: PokemonTileComponent;
  let fixture: ComponentFixture<PokemonTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonTileComponent, PokemonNumberPipe],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonTileComponent);
    component = fixture.componentInstance;
    component.pokemon = {
      id: 1,
      name: 'test',
      types: [
        { type: { name: 'flying' }, slot: 1 },
        { type: { name: 'dragon' }, slot: 2 },
      ],
      sprites: { other: { 'official-artwork': { front_default: 'img.url' } } },
    } as Pokemon;
    fixture.detectChanges();
  });

  it('should display the image', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const image = compiled.querySelector('.pokemon__sprite');
    expect(image?.getAttribute('src')).toBe('img.url');
  });

  it('should display the pokemon number', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const number = compiled.querySelector('.pokemon__number');
    expect(number?.textContent).toBe('#0001');
  });

  it('should display the pokemon name', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const name = compiled.querySelector('.pokemon__name');
    expect(name?.textContent).toBe('test');
  });

  it('should display the pokemon types', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const types = compiled.querySelector('.pokemon__types');
    expect(types?.children).toHaveLength(2);
    expect(types?.children[0].textContent).toContain('flying');
    expect(types?.children[1].textContent).toContain('dragon');
  });
});
