import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../services/category.service';
import {Category} from '../category/category';


@Component({
  selector: 'admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  categories: Category[];
  constructor(categoryService: CategoryService) {
    categoryService.categories.subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }

  ngOnInit() {
  }

}
