import { Component, OnInit } from '@angular/core';
import {NavigationService} from '../services/navigation.service';
import {Category} from './category';
import {CategoryService} from '../services/category.service';

@Component({
  selector: 'category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  category: Category;
  tempCategory: Category = new Category();

  constructor(private navigation: NavigationService, private categoryService: CategoryService) {
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
      this.categoryService.createNewCategory(this.category);
    }
    this.navToDashboard();
  }

  cancelChanges() {
    this.category.title = this.tempCategory.title;
    this.navigation.setActiveCategory(null);
    this.navToDashboard();
  }

  resetCategory() {
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
