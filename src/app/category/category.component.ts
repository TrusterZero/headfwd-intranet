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

  category: Category = null
  tempCategory: Category = new Category();

  constructor(private navigation: NavigationService, private categoryService: CategoryService) {
    navigation.activeCategory.subscribe((category: Category) => {
      if (!category) {
        this.category = null;
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
      const newCategory: Category = {
        id: 99, // gets this id during testfase
        title: document.getElementById('title').value,
        pages: []
      };

      this.categoryService.createNewCategory(newCategory);
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
