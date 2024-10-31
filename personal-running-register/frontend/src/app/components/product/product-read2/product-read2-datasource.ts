import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Sport } from '../product.model';


// TODO: replace this with real data from your application
const EXAMPLE_DATA: Sport[] = [
  {id: 1, name: 'Hydrogen', distance: '21km', time: '120 minutes', pace: '5.45'},
  {id: 2, name: 'Helium', distance: '21km', time: '120 minutes', pace: '5.45'},
  {id: 3, name: 'Lithium', distance: '21km', time: '120 minutes', pace: '5.45'},
  {id: 4, name: 'Beryllium', distance: '21km', time: '120 minutes', pace: '5.45'},
  {id: 5, name: 'Boron', distance: '21km', time: '120 minutes', pace: '5.45'},
  {id: 6, name: 'Carbon', distance: '21km', time: '120 minutes', pace: '5.45'},
  {id: 7, name: 'Nitrogen', distance: '21km', time: '120 minutes', pace: '5.45'},
  {id: 8, name: 'Oxygen', distance: '21km', time: '120 minutes', pace: '5.45'},
  {id: 9, name: 'Fluorine', distance: '21km', time: '120 minutes', pace: '5.45'},
  {id: 10, name: 'Neon', distance: '21km', time: '120 minutes', pace: '5.45'},
  {id: 11, name: 'Sodium', distance: '21km', time: '120 minutes', pace: '5.45'},
  {id: 12, name: 'Magnesium', distance: '21km', time: '120 minutes', pace: '5.45'},
  {id: 13, name: 'Aluminum', distance: '21km', time: '120 minutes', pace: '5.45'},
  {id: 14, name: 'Silicon', distance: '21km', time: '120 minutes', pace: '5.45'},
  {id: 15, name: 'Phosphorus', distance: '21km', time: '120 minutes', pace: '5.45'},
  {id: 16, name: 'Sulfur', distance: '21km', time: '120 minutes', pace: '5.45'},
  {id: 17, name: 'Chlorine', distance: '21km', time: '120 minutes', pace: '5.45'},
  {id: 18, name: 'Argon', distance: '21km', time: '120 minutes', pace: '5.45'},
  {id: 19, name: 'Potassium', distance: '21km', time: '120 minutes', pace: '5.45'},
  {id: 20, name: 'Calcium', distance: '21km', time: '120 minutes', pace: '5.45'},
];

/**
 * Data source for the ProductRead2 view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ProductRead2DataSource extends DataSource<Sport> {
  data: Sport[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Sport[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Sport[]): Sport[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Sport[]): Sport[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id!, +b.id!, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
