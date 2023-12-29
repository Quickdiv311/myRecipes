import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    headingList = ['Recipes', 'Shopping List'];
    currentPageIndex: number = 0;
    @Output() pageChanged = new EventEmitter<number>();

    pageChange(index: number){
      this.pageChanged.emit(index);
    }
}
