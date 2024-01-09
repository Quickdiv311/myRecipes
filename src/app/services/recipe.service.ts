import { Injectable } from '@angular/core';
import { Recipe } from '../components/recipes/recipes.model';
import { Ingredient } from '../components/shared/models/Ingredient.model';
import { ShoppingService } from './shopping.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();
  idCounter = 3;
  
  recipes: Recipe[]   = [
    new Recipe(1,'burger', 'a delicious burger', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=999&q=80',
     [new Ingredient("potato",1), new Ingredient("tomato",1)]),
    new Recipe(2,'burger 2', 'a very delicious burger', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=999&q=80',
    [new Ingredient("potato",1), new Ingredient("cucumber",1)])
  ]
  
  constructor(private shoppingListService: ShoppingService){}
 
  getRecipeList(){
    return this.recipes.slice();
  }

  getRecipe(id: number){
    return this.recipes.slice().find(i => i.id === id);
  }

  updateRecipe(id: number, newRecipe: Recipe){
    let recipeIndex = this.recipes.findIndex(i => i.id == id);
    console.log(this.recipes[recipeIndex]);
    this.recipes[recipeIndex] = newRecipe;
    console.log(this.recipes[recipeIndex]);
    this.recipesChanged.next(this.recipes.slice());
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(id?: number){
    let recipeIndex = this.recipes.findIndex(i => i.id == id);
     this.recipes.splice(recipeIndex,1);
    this.recipesChanged.next(this.recipes.slice());
  }

  addToShoppingList(ingredients: Ingredient[]){
    this.shoppingListService.addIngredients(ingredients);
  }
}
