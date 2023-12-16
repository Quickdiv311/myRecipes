import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/models/Ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  @ViewChild('ingredientName',{static: false}) ingredientNameRef?: ElementRef;
  @ViewChild('ingredientAmount',{static: false}) ingredientAmountRef? : ElementRef;
  @Output() ingredientAdded = new EventEmitter<Ingredient>();
  newIngredient?: Ingredient; 

  onAdd(){
    let name = this.ingredientNameRef?.nativeElement.value;
    let amount  = this.ingredientAmountRef?.nativeElement.value;
    this.newIngredient = new Ingredient(name,amount);
    this.ingredientAdded.emit(this.newIngredient);
  }
}
