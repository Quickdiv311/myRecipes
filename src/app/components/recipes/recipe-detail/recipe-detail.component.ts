import { Component, Input } from '@angular/core';
import { Recipe } from '../recipes.model';
import { Ingredient } from '../../shared/models/Ingredient.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {
  @Input() recipeDetail?: Recipe;

  constructor(private recipeService: RecipeService){}

  addIngredientsToList(){
    if(this.recipeDetail)
    this.recipeService.addToShoppingList(this.recipeDetail.ingredients);
  }
}
