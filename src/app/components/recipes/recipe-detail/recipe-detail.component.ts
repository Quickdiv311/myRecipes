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
  id?: number;
  recipeDetail?: Recipe;

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
         this.id = +params['id'];
         this.recipeDetail = this.recipeService.getRecipe(this.id);
    })

    this.recipeService.recipesChanged.subscribe(rec => {
        rec.forEach(i => {
          if(i.id == this.id)
          {
            this.recipeDetail = i;
          }
        })
    })
  }

  addIngredientsToList(){
    if(this.recipeDetail)
    this.recipeService.addToShoppingList(this.recipeDetail.ingredients);
    this.router.navigate(['/shopping']);
  }

  onDeleteRecipe(){
     this.recipeService.deleteRecipe(this.id);
     this.router.navigate(['recipes']);
  }
}
