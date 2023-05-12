import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paginate'
})
export class PaginatePipe implements PipeTransform {

  transform(items: any[], args: { itemsPerPage: number, currentPage: number }): any[] {
    const startIndex = (args.currentPage - 1) * args.itemsPerPage;
    const endIndex = startIndex + args.itemsPerPage;

    return items.slice(startIndex, endIndex);
  }

}
