import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../../recipes.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe?: Recipe;
  currentActive?: number;

  constructor(private recipeService: RecipeService){}

  ngOnInit(): void {
    this.recipeService.currentChanged.subscribe((current: number) => {
       this.currentActive = current;
    })
  }

  recipeSelect(){
     this.recipeService.recipeSelected.emit(this.recipe);
     this.recipeService.currentChanged.emit(this.recipe?.id);
  }
}
