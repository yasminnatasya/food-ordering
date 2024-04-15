import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipes'
})
export class PipesPipe implements PipeTransform {
  transform(items: any[], category: string): any[] {
    if (!items || !category || category === 'All') {
      return items;
    }
    return items.filter(item => item.category === category);
  }

}
