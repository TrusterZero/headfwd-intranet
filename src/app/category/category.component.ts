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
  initialCategory: Category = {
    id: null,
    title: '',
    pages: []
  }
  category: Category = this.initialCategory
  tempCategory: Category = new Category();

  constructor(private navigation: NavigationService, private categoryService: CategoryService) {
    navigation.activeCategory.subscribe((category: Category) => {
      if (!category) {
        this.category = this.initialCategory
        return;
      }
      this.category = category;
      this.tempCategory.title =  category.title;
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
    if (this.category) {
      this.category.title = this.tempCategory.title;
    }
    this.navToDashboard();
  }

  ngOnInit() {
  }

}
