import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from '../recipes.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit{

   id= -1;
   editMode?: boolean;
   recipeForm!: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router){}

  ngOnInit(): void {
       this.route.params.subscribe((params: Params) => {
           this.id = +params['id'];
           this.editMode = !!params['id']; 
           this.initializeForm();
       });
  }

  onSubmit(){
    let {name,imagePath,description,ingredients} = this.recipeForm.value;

    if(this.editMode){
      let newRecipe = new Recipe(this.id,name,description,imagePath,ingredients);
      this.recipeService.updateRecipe(this.id, newRecipe);
    }
    else
    {
      this.id = ++this.recipeService.idCounter;
      let newRecipe = new Recipe(this.id,name,description,imagePath,ingredients);
      this.recipeService.addRecipe(newRecipe);
    }
    this.onCancel();
  }

  onCancel(){
    if(this.recipeForm.valid)
    this.router.navigate(['/recipes','detail',this.id]);
     
    else
    this.router.navigate(['/recipes']);
  }

  onAddIngredient(){
    (this.recipeForm.get('ingredients') as FormArray).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }))
  }

  onDeleteIngredient(id: number){
    (this.recipeForm.get('ingredients') as FormArray).removeAt(id);
  }

  get controls(){
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

   initializeForm(){
        let recipeName = '';
        let recipeDescription = '';
        let recipeImage = '';
        let recipeIngredients = new FormArray<FormGroup>([]);
        const recipe = this.recipeService.getRecipe(this.id);

        if(this.editMode && recipe){
          let {name, description, imagePath, ingredients} = recipe;
          recipeName = name;
          recipeDescription = description;
          recipeImage = imagePath;
          if(ingredients){
            for(let ingredient of ingredients){
              recipeIngredients.push(new FormGroup({
                'name': new FormControl(ingredient.name, Validators.required),
                'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
              }))
            }
          }
        }

        this.recipeForm = new FormGroup({
          'name': new FormControl(recipeName, Validators.required),
          'description': new FormControl(recipeDescription, Validators.required),
          'imagePath': new FormControl(recipeImage,Validators.required),
          'ingredients': recipeIngredients
        })
   }

  //  checkImagePath(control: FormControl) {
  //    if(control.value.includes('json')){
  //       return {'notAllowed': true}
  //    }
  //    return null;
  //  }
}
