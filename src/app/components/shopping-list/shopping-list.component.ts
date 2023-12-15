import { Component } from '@angular/core';
import { Ingredient } from '../shared/models/Ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {
  ingredients: Ingredient[] = [
    new Ingredient('apple',1),
    new Ingredient('banana',2),
  ]
}
