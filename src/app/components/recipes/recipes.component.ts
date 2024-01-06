import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipes.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
   recipeSelected?: Recipe;

   constructor(private recipeService: RecipeService){}

   ngOnInit(){
       this.recipeService.recipeSelected.subscribe((recipe: Recipe) => {
         this.recipeSelected = recipe;
       })
   }
}
