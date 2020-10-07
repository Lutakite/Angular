import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'ruble' })
export class RublePipe implements PipeTransform {
    transform(price: number): string {
        return price.toString().split('.')[0];
    }
}
