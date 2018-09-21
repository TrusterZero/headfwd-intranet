import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';
import { CategoryComponent } from './category/category.component';
import { PageComponent } from './page/page.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule,MatIconModule } from '@angular/material';
import { NavigationComponent } from './navigation/navigation.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import {MessageComponent} from './message/message.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    PageComponent,
    AdminDashboardComponent,
    NavigationComponent,
    HeaderComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
