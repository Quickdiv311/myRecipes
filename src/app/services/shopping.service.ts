import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../components/shared/models/Ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  ingredientAdded = new Subject<Ingredient>();

  ingredients: Ingredient[] = [
    new Ingredient('apple',1),
    new Ingredient('banana',2),
  ]
  
  constructor() { }

  getIngredients(){
    return this.ingredients.slice();
  }

  addIngredients(addedIngredients: Ingredient[]){
    this.ingredients.push(...addedIngredients);
    addedIngredients.forEach(i => this.ingredientAdded.next(i));
  }
}
