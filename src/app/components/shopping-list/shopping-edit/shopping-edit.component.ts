import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/models/Ingredient.model';
import { ShoppingService } from 'src/app/services/shopping.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('f', {static: false}) form?: NgForm;
  ingredient?: Ingredient; 
  canEdit= false;
  selectedIndex = -1;
  selectedItem?: Ingredient;

  constructor(private shoppingService: ShoppingService){}

  ngOnInit(): void {
      this.shoppingService.ingredientSelected.subscribe((index: number) => {
        this.canEdit = true;
        this.selectedIndex = index;
        this.selectedItem = this.shoppingService.getIngredient(index);
        this.form?.setValue({
          name: this.selectedItem.name,
          amount: this.selectedItem.amount
        })
      })
  }

  onAdd(form: NgForm){
    let {name, amount} = form.value;
    this.ingredient = new Ingredient(name,amount);
    if(this.canEdit){
      this.shoppingService.updateIngredient(this.selectedIndex, this.ingredient);
      this.canEdit = false;
    }
    else
    {
      this.shoppingService.addIngredient(this.ingredient);
    }
    form.reset();
  }

  onClear(){
    this.form?.reset();
    this.canEdit = false;
  }

  onDelete(){
    this.shoppingService.deleteIngredient(this.selectedIndex);
    this.form?.reset();
    this.canEdit = false;
  }
}
