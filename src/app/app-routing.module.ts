import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './components/recipes/recipes.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { NorecipeSelectedComponent } from './components/recipes/norecipe-selected/norecipe-selected.component';
import { RecipeDetailComponent } from './components/recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './components/recipes/recipe-edit/recipe-edit.component';
import { RecipeResolverService } from './services/recipe-resolver.service';
import { AuthComponent } from './components/auth/auth.component';
import { AuthGuard } from './components/auth/auth-guard';

const routes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path: 'recipes', component: RecipesComponent, children: [
    {path: '', component: NorecipeSelectedComponent},
    {path: 'new', component: RecipeEditComponent, canActivate: [AuthGuard]},
    {path: 'detail/:id', component: RecipeDetailComponent, resolve: [RecipeResolverService], canActivate: [AuthGuard]},
    {path: 'edit/:id', component: RecipeEditComponent, resolve: [RecipeResolverService], canActivate: [AuthGuard]},
  ]},
  {path: 'auth', component: AuthComponent},
  {path: 'shopping', component: ShoppingListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
