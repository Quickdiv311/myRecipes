import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipes.model';
import { Ingredient } from '../../shared/models/Ingredient.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeDetail?: Recipe;

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
         this.recipeDetail = this.recipeService.getRecipe(+params['id']);
    })
  }

  addIngredientsToList(){
    if(this.recipeDetail)
    this.recipeService.addToShoppingList(this.recipeDetail.ingredients);
    this.router.navigate(['/shopping']);
  }
}
