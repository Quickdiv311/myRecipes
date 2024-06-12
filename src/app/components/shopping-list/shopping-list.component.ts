import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/models/Ingredient.model';
import { ShoppingService } from 'src/app/services/shopping.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy{
  ingredients?: Ingredient[];
  ingredientsHaveChanged?: Subscription;
  current?:number;

  constructor(private shoppingService: ShoppingService){}

  ngOnInit(): void {
    this.shoppingService.fetchList();
     
     this.shoppingService.ingredientsChanged.subscribe((ingredients: Ingredient[]) => {
           this.ingredients = [...ingredients];
     })
  }

  onClear(value: boolean){
     this.current = -1;
  }

  ngOnDestroy(): void {
    this.ingredientsHaveChanged?.unsubscribe();
  }
}
