import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myRecipes';
  currentPage: number = 0;

  onPageChange(index: number){
    this.currentPage = index;
  } 
}
