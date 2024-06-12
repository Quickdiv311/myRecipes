import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
    headingList = ['Recipes', 'Shopping List'];
    currentPageIndex: number = 0;
    isLoggedIn = false;
    @Output() pageChanged = new EventEmitter<number>();
    userSub?: Subscription;

    constructor(private authService: AuthService){}

    ngOnInit(): void {
      this.authService.user.subscribe((user) => {
           this.isLoggedIn = !!user;
      })
    }

    pageChange(index: number){
      this.pageChanged.emit(index); 
    }

    onSignOut(){
      this.authService.signOut();
    }

    ngOnDestroy(): void {
      this.userSub?.unsubscribe();
    }
}
