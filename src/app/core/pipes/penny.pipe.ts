import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'penny' })
export class PennyPipe implements PipeTransform {
    transform(price: number): string {
        return price.toString().split('.')[1];
    }
}
