import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './components/recipes/recipes.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { NorecipeSelectedComponent } from './components/recipes/norecipe-selected/norecipe-selected.component';
import { RecipeDetailComponent } from './components/recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './components/recipes/recipe-edit/recipe-edit.component';
import { RecipeResolverService } from './services/recipe-resolver.service';

const routes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path: 'recipes', component: RecipesComponent, children: [
    {path: '', component: NorecipeSelectedComponent},
    {path: 'new', component: RecipeEditComponent},
    {path: 'detail/:id', component: RecipeDetailComponent, resolve: [RecipeResolverService]},
    {path: 'edit/:id', component: RecipeEditComponent, resolve: [RecipeResolverService]}
  ]},
  {path: 'shopping', component: ShoppingListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
