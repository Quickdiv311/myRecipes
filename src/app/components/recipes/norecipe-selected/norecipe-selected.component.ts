import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-norecipe-selected',
  templateUrl: './norecipe-selected.component.html',
  styleUrls: ['./norecipe-selected.component.css']
})
export class NorecipeSelectedComponent implements OnInit{

  isLogged = false;

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
        this.isLogged = !!user;
    })
  }
}
