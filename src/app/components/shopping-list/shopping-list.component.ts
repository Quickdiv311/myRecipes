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
  ingredientIsAdded?: Subscription;

  constructor(private shoppingService: ShoppingService){}

  ngOnInit(): void {
     this.ingredients = this.shoppingService.getIngredients(); 
     this.ingredientIsAdded = this.shoppingService.ingredientAdded.subscribe((ingredient: Ingredient) => {
        this.ingredients?.push(ingredient);
     })  
  }

  ngOnDestroy(): void {
    this.ingredientIsAdded?.unsubscribe();
  }
}
