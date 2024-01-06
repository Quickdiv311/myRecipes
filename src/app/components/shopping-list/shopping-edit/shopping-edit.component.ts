import { Component, ElementRef, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/models/Ingredient.model';
import { ShoppingService } from 'src/app/services/shopping.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  @ViewChild('ingredientName',{static: false}) ingredientNameRef?: ElementRef;
  @ViewChild('ingredientAmount',{static: false}) ingredientAmountRef? : ElementRef;
  newIngredient?: Ingredient; 

  constructor(private shoppingService: ShoppingService){}
  

  onAdd(){
    let name = this.ingredientNameRef?.nativeElement.value;
    let amount  = this.ingredientAmountRef?.nativeElement.value;
    this.newIngredient = new Ingredient(name,amount);
    this.shoppingService.ingredientAdded.next(this.newIngredient);
  }
}
