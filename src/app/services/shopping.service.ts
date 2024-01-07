import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../components/shared/models/Ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  ingredientSelected = new Subject<number>();
  ingredientsChanged = new Subject<Ingredient[]>();

  ingredients: Ingredient[] = [
    new Ingredient('apple',1),
    new Ingredient('banana',2),
  ]
  
  constructor() { }

  getIngredients(){
    return this.ingredients.slice();
  }

  getIngredient(index: number){
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(addedIngredients: Ingredient[]){
    this.ingredients.push(...addedIngredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number,newIngredient: Ingredient){
       this.ingredients[index] = newIngredient;
       this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number){
     this.ingredients.splice(index,1);
     this.ingredientsChanged.next(this.ingredients.slice());
  }
}
