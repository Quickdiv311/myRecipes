import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipes.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
   recipeSelected?: Recipe;

   constructor(){}

   ngOnInit(){
       
   }

   onRecipeSelect(recipe: Recipe){
       this.recipeSelected = recipe;
   }
}
