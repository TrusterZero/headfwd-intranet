import { Component, OnInit } from '@angular/core';
import {NavigationService} from '../services/navigation.service';
import {Category} from './category';
import {CategoryService} from '../services/category.service';
import {MessageService} from "../message/message.service";
import {Message} from "../message/message.interface";

@Component({
  selector: 'category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  category: Category;
  tempCategory: Category = new Category();

  constructor(private navigation: NavigationService, private categoryService: CategoryService, private message: MessageService) {
    this.resetCategory();
    navigation.activeCategory.subscribe((category: Category) => {

      if (!category) {
        this.resetCategory()
        return;
      }
      this.category = category;
      this.tempCategory.title = category.title;
    });
  }

  navToDashboard() {
  this.navigation.navigateToDashboard();
  }

  handleChanges() {
    if (this.category && this.category.id) {
      this.categoryService.editCategory(this.category);
    } else {
      this.category.id = this.categoryService.categories.getValue().length + 1; // for testing
      this.categoryService.createNewCategory(this.category);
    }
    this.navToDashboard();
  }

  cancelChanges() {
    this.category.title = this.tempCategory.title;
    this.navigation.setActiveCategory(null);
    this.navToDashboard();
  }

  deleteWarning() {
    const deleteWarning: Message = {
      loading: false,
      action: () => this.deleteCategory(),
      denyAction: () => {
      },
      text: 'Are you sure?',
      acceptText: 'Yes',
      denyText: 'No'
    };
    this.message.Stream$.next(deleteWarning);
  }

  deleteCategory(): void {
    this.categoryService.deleteCategory(this.category.id);
    this.navigation.navigateToDashboard();
  }

  private resetCategory() {
    this.category = {
      id: null,
      title: '',
      pages: []
    };
    this.tempCategory = this.category;
  }

  ngOnInit() {
  }

}
