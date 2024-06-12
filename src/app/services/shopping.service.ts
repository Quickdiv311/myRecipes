import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../components/shared/models/Ingredient.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  ingredientSelected = new Subject<number>();
  ingredientsChanged = new Subject<Ingredient[]>();
  ingredients: Ingredient[] = [];
  
  constructor(private http: HttpClient) { }

  getIngredients(){
    return this.ingredients.slice();
  }

  updateList(){
    this.http.put('https://recipes-ae571-default-rtdb.firebaseio.com/shopping-list.json', this.ingredients)
    .subscribe(res => {console.log(res)})
  }

  fetchList(){
    this.http.get<Ingredient[]>('https://recipes-ae571-default-rtdb.firebaseio.com/shopping-list.json')
    .subscribe(ing => {
       this.ingredients = ing;
       this.ingredientsChanged.next(this.ingredients);
    })
  }

  getIngredient(index: number){
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
    this.updateList();
  }

  addIngredients(addedIngredients: Ingredient[]){
    this.ingredients.push(...addedIngredients);
    this.ingredientsChanged.next(this.ingredients.slice());
    this.updateList();
  }

  updateIngredient(index: number,newIngredient: Ingredient){
       this.ingredients[index] = newIngredient;
       this.ingredientsChanged.next(this.ingredients.slice());
       this.updateList();
  }

  deleteIngredient(index: number){
     this.ingredients.splice(index,1);
     this.ingredientsChanged.next(this.ingredients.slice());
     this.updateList();
  }
}
