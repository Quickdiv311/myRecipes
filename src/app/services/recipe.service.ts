import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from '../components/recipes/recipes.model';
import { Ingredient } from '../components/shared/models/Ingredient.model';
import { ShoppingService } from './shopping.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();
  currentChanged = new EventEmitter<number>();

  recipes: Recipe[]   = [
    new Recipe(101,'burger', 'a delicious burger', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=999&q=80',
     [new Ingredient("potato",1), new Ingredient("tomato",1)]),
    new Recipe(102,'burger 2', 'a very delicious burger', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=999&q=80',
    [new Ingredient("potato",1), new Ingredient("cucumber",1)])
  ]
  
  constructor(private shoppingListService: ShoppingService){}
 
  getRecipeList(){
    return this.recipes.slice();
  }

  addToShoppingList(ingredients: Ingredient[]){
    this.shoppingListService.addIngredients(ingredients);
  }
}