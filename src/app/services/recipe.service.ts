import { Injectable } from '@angular/core';
import { Recipe } from '../components/recipes/recipes.model';
import { Ingredient } from '../components/shared/models/Ingredient.model';
import { ShoppingService } from './shopping.service';
import { Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import {exhaustMap, map, take, tap} from 'rxjs/operators';
import { AuthService } from '../components/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();
  idCounter = 3;
  
  recipes: Recipe[]   = []
  
  constructor(private shoppingListService: ShoppingService, private http: HttpClient, private authService: AuthService){}
 
  getRecipeList(){
    return this.recipes.slice();
  }

  updateRecipes(){
     this.http.put('https://recipes-ae571-default-rtdb.firebaseio.com/recipes.json', this.recipes).subscribe(res => {
     })
  }

   fetchRecipes(){
        return this.http.get<Recipe[]>('https://recipes-ae571-default-rtdb.firebaseio.com/recipes.json')
        .pipe(
          map((recipes: Recipe[]) => {
            return recipes.map(recipe => {
                return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
             })
           }),
           tap((res: Recipe[]) => {
             this.recipes = res;
             this.recipesChanged.next(this.recipes.slice());
           })
        )
   }

  getRecipe(id: number){
    return this.recipes.slice().find(i => i.id === id);
  }

  updateRecipe(id: number, newRecipe: Recipe){
    let recipeIndex = this.recipes.findIndex(i => i.id == id);
    this.recipes[recipeIndex] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
    this.updateRecipes();
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
    this.updateRecipes();
  }

  deleteRecipe(id?: number){
    let recipeIndex = this.recipes.findIndex(i => i.id == id);
     this.recipes.splice(recipeIndex,1);
    this.recipesChanged.next(this.recipes.slice());
    this.updateRecipes();
  }

  addToShoppingList(ingredients: Ingredient[]){
    this.shoppingListService.addIngredients(ingredients);
  }
}
