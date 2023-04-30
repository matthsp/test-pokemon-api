import { Pipe, PipeTransform } from '@angular/core';

/*
 * Format a number to display a number in the '#0000' format
 *
 * Usage:
 *   value | pokemonNumber
 * Example:
 *   {{ 2 | pokemonNumber }}
 *   formats to: #0002
 */
@Pipe({ name: 'pokemonNumber' })
export class PokemonNumberPipe implements PipeTransform {
  transform(value: number): string {
    const paddedNumber = `${value}`.padStart(4, '0');
    return `#${paddedNumber}`;
  }
}
