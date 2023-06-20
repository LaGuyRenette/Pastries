import { Component, OnInit } from '@angular/core';
import { PASTRIES, Max } from '../mock-pastries';
import { Paginate, Pastrie, PreferencePastries } from '../pastrie';
import { PastriesService } from '../pastries.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Component({
  selector: 'app-pastries',
  templateUrl: './pastries.component.html',
  styleUrls: ['./pastries.component.scss'],
})
export class PastriesComponent implements OnInit {
  pastries: Pastrie[] = [];
  titlePage: string = 'Page principale : liste des pâtisseries à gagner';
  preferencePastries: PreferencePastries[] = [];
  count: number = 0;
  color: string = "#009688";


  currentPastrie: Pastrie | null = null;

  constructor(private ps: PastriesService,
    private router: Router) {
    // console.log('Constructor');
  }

  ngOnInit(): void {
    // console.log('Monter dans le DOM ...');

    this.ps.paginate(0, 3).subscribe(pastries => {
      this.pastries = pastries;
    })
  }

  // (click) = récupère la pastrie
  onSelect(pastrie: Pastrie): void {
    console.log(pastrie);

    this.currentPastrie = pastrie;
  }

  changeParentPreference($event: string): void {
    console.log($event);

    const pastrie: Pastrie | undefined = this.pastries.find(
      (p) => p.id == $event
    );

    if (pastrie) {
      pastrie.choice = !pastrie.choice;

      if (pastrie.choice && this.count < Max) this.count++;
      if (!pastrie.choice && this.count > 0) this.count--;

    }
  }

  search($event: Pastrie[]): void {
    this.pastries = $event;
  }

  paginate($event: Paginate): void {
    const { start, end } = $event;
    this.ps.paginate(start, end).subscribe(pastries => this.pastries = pastries);
  }


addPastrie(): void {
  const newPastrie: Pastrie = {
    id: '',
    ref: '',
    name: '',
    description: '',
    url: '',
    quantity: 0,
    order: 0,
    like: '',
    choice: false,
  };
  this.ps.addRecipe(newPastrie).subscribe((pastrie) => {
    
    if (pastrie) {
      console.log('Recette ajoutée:', pastrie);
    } else {
      console.log("Erreur lors de l'ajout de la recette");
    }
  })
}
modifyPastrie() {
  if (this.currentPastrie) {
    this.ps.updateRecipe(this.currentPastrie)
      .pipe(
        catchError(error => {
          console.error('Erreur lors de la modification de la recette:', error);
          // Gérer l'erreur ici (affichage d'un message, rollback, etc.)
          return throwError(error); // Renvoyer l'erreur pour la propagation ultérieure
        })
      )
      .subscribe(pastrie => {
        console.log('Recette modifiée:', pastrie);
        this.router.navigate(['/recette', pastrie.id]);
      });
  }
}

deletePastrie() {
  if(this.currentPastrie){
    this.ps.deleteRecipe(this.currentPastrie.id).subscribe(()=>{
      console.log('Recette supprimé',);
    });
  }
}
}

