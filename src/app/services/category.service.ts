import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Category} from '../category/category';
import {ApiService, Resource} from './api.service';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  initialCategories: Category[] = [];
  categories: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>(this.initialCategories)

  constructor(private api: ApiService) {
    this.refreshCategories();
  }

  refreshCategories(): void {
    // this.api.get(Resource.AllCategories).subscribe((categories: Category[]) => {
    //   console.log(categories)
    //   this.categories.next(categories);
    // });
    this.categories.next([
      {
        "id": 1,
        "title": "Lorem Ipsum",
        "pages":[]
      },
      {
        "id": 2,
        "title": "Lorem Ipsum",
        "pages":[]
      },
      {
        "id": 3,
        "title": "Lorem Ipsum",
        "pages":[]
      },
      {
        "id": 3,
        "title": "Lorem Ipsum",
        "pages":[]
      }
    ]);
  }
}
