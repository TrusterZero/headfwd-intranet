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

  createNewCategory(category: Category) {
    // this.api.post(Resource.Categories, category);

    const categories = this.categories.getValue();
    categories.push(category);
    this.categories.next(categories);
  }

  editCategory(newCategory: Category) {
    console.log(newCategory)
    // this.api.put(Resource.Categories, category);
    const categories = this.categories.getValue();
    const index = categories.indexOf(categories.find((oldCategory) => oldCategory.id === newCategory.id));
    categories[index] = newCategory;
    this.categories.next(categories);
  }

  deleteCategory(id: number) {
    // this.api.delete(Resource.Categories, id);
    const categories = this.categories.getValue();
    const index = categories.indexOf(categories.find((category) => category.id === id));
    categories.splice(index, 1);
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
        "id": 4,
        "title": "Lorem Ipsum",
        "pages":[]
      }
    ]);
  }
}
