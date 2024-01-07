import { Component, Input } from '@angular/core';
import { Ingredient } from '../../shared/models/Ingredient.model';
import { ShoppingService } from 'src/app/services/shopping.service';

@Component({
  selector: 'app-shopping-item',
  templateUrl: './shopping-item.component.html',
  styleUrls: ['./shopping-item.component.css']
})
export class ShoppingItemComponent {
  @Input() ingredient?: Ingredient;
  @Input() index?: number;

  constructor(private shoppingService: ShoppingService){}

  onItemClick(index: number|undefined){
       this.shoppingService.ingredientSelected.next(index);
  }
}
