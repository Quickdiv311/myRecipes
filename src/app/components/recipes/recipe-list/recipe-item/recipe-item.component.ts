import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../../recipes.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {
  @Input() recipe?: Recipe;
  @Input() current?: number;
  @Output() activeChanged = new EventEmitter<Recipe>();

  activeChange(){
    this.activeChanged.emit(this.recipe);
  }
}
