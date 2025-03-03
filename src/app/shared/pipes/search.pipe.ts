import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items : any[], searchText: string): any {
    return items.filter(item => item.title.toLowerCase().includes(searchText.toLowerCase()));
  }

}
