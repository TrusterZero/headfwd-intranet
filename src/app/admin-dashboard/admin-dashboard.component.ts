import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../services/category.service';
import {Category} from '../category/category';
import {NavigationService} from '../services/navigation.service';


@Component({
  selector: 'admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  categories: Category[];
  constructor(categoryService: CategoryService, private navigation: NavigationService) {
    categoryService.categories.subscribe((categories: Category[]) => {
      console.log('admin dashboard categories' , categories)
      this.categories = categories;
    });
  }

  navToCategory(id) {
    this.navigation.navigateToCategory(id);
  }
  ngOnInit() {
  }

}
