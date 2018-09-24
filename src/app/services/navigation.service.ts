import { Injectable } from '@angular/core';
import {CategoryService} from './category.service';
import {BehaviorSubject, Subject} from 'rxjs';
import {Category} from '../category/category';
import {PageService} from './page.service';
import {Page} from '../page/page';

interface previousPage {
  id?: number;
  contentMode: ContentMode;
}
export enum ContentMode {
  dashboard = 0,
  category = 1,
  page = 2
}

@Injectable({
  providedIn: 'root'
})

export class NavigationService {
  history: previousPage[] = [];
  contentMode: BehaviorSubject<ContentMode> = new BehaviorSubject<ContentMode>(ContentMode.dashboard)
  activeCategory: Subject<Category> = new Subject<Category>()
  activePage: Subject<Page> = new Subject<Page>();

  constructor(private categoryService: CategoryService, private pageService: PageService) {

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
    const categories = this.categoryService.categories.getValue();

    const nextCategory = categories.find((category) => id === category.id);

    if (nextCategory) {
      this.activeCategory.next(nextCategory);
    }
  }

  setActivePage(id: number) {
    if (!id) {
      this.activePage.next(null);
      return;
    }
    const pages = this.pageService.pages.getValue();

    const nextPage = pages.find((page) => id === page.id);

    if (nextPage) {
      this.activePage.next(nextPage);
    }
  }

  navigateToCategory(id: number) {
    this.setActiveCategory(id);
    this.contentMode.next(ContentMode.category);
  }

  navigateToDashboard() {
    this.contentMode.next(ContentMode.dashboard);
  }

  navigateToPage(id) {
    this.contentMode.next(ContentMode.page);
    this.setActivePage(id);
  }
}
