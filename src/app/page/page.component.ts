import { Component, OnInit } from '@angular/core';
import {Page} from './page';
import {PageService} from '../services/page.service';
import {NavigationService} from '../services/navigation.service';
import {MessageService} from '../message/message.service';
import {Message} from "../message/message.interface";

@Component({
  selector: 'page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  page: Page
  tempPage: Page = new Page();
  constructor(private pageService: PageService, private navigationService: NavigationService, private message: MessageService) {
    this.resetPage();
    this.navigationService.activePage.subscribe((page: Page) => {
      this.page = page;
      this.tempPage.title = page.title;
      this.tempPage.text = page.text;
      this.tempPage.categoryId = page.categoryId;
    });
  }

  handleChanges() {
    if (this.page && this.page.id) {
      this.pageService.editPage(this.page);
    } else {
      this.page.id = this.pageService.pages.getValue().length + 1; // for testing
      this.pageService.createNewPage(this.page);
    }
    this.navToCategory(this.page.categoryId);
    this.message.show('Page saved!');
  }

  deleteWarning() {
    const deleteWarning: Message = {
      action: () => this.deletePage(),
      denyAction: () => {},
      text: 'Are you sure?',
      acceptText: 'Yes',
      denyText: 'No'
    };
    this.message.Stream$.next(deleteWarning);
  }

  deletePage(): void {
    this.pageService.deletePage(this.page.id);
    this.navToCategory(this.page.id);
  }

  resetPage() {
    this.page = {
      id: 0,
      title: '',
      text: '',
      categoryId: null
    };
  }
  cancelChanges() {
    this.page.title = this.tempPage.title;
    this.page.text = this.tempPage.text;
    this.page.categoryId = this.tempPage.categoryId;

    this.navToCategory(this.page.categoryId);
  }

  navToCategory(id: number): void {
    this.navigationService.navigateToCategory(id);
  }
  ngOnInit() {
  }

}
