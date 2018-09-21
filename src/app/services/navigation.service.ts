import { Injectable } from '@angular/core';
import {CategoryService} from './category.service';
import {BehaviorSubject, Subject} from 'rxjs';
import {Category} from '../category/category';
import { HostListener } from '@angular/core';

export enum ContentMode {
  dashboard = 0,
  category = 1,
  page = 2
}

@Injectable({
  providedIn: 'root'
})

export class NavigationService {
  contentMode: BehaviorSubject<ContentMode> = new BehaviorSubject<ContentMode>(ContentMode.dashboard)
  activeCategory: Subject<Category> = new Subject<Category>()

  constructor(private categoryService: CategoryService) {

  }

  /***
   *
   * Changes the active category to category with the selected id
   * resets active category if id isn't present
   *
   * @param id
   */
  setActiveCategory(id: number) {
    if (!id) {
      this.activeCategory.next(null);
      return;
    }
    const categories = this.categoryService.categories.getValue()
    this.activeCategory.next(categories.find((category) => id === category.id));
  }

  navigateToCategory(id) {
    this.setActiveCategory(id);
    this.contentMode.next(ContentMode.category);
  }

  navigateToDashboard() {
    this.contentMode.next(ContentMode.dashboard);
  }
}
