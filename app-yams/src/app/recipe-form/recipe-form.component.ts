import { Component, OnInit } from '@angular/core';
import { Pastrie } from '../pastrie';
import { PastriesService } from '../pastries.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss']
})
export class RecipeFormComponent  implements OnInit  {
  recipe: Pastrie = {
    id: '',
    ref: '',
    name: '',
    description: '',
    quantity: 0,
    order: 0,
    like: '',
    tags:[],
    url: '',
    choice: false
  };
  constructor(private route: ActivatedRoute, private ps: PastriesService, private router: Router){}

  ngOnInit(): void {
    this.route.params.subscribe((params) =>{
      const recipeId = params['id'];

      if(recipeId){
        this.ps.getRecipe(recipeId).subscribe((recipe)=>{
          this.recipe = recipe;
        });
      }
    });
  }

  onSubmit():void{
    this.ps.addRecipe(this.recipe).subscribe(response=>{
      console.log("success!", response);
      this.recipe = {
        id: '',
        ref: '',
        name: '',
        description: '',
        url: '',
        quantity: 0,
        order: 0,
        like: '',
        choice: false
      };
      this.router.navigate(['/home']);
    }, error =>{
      console.error("Echec", error);
    }
    );
  }


}
