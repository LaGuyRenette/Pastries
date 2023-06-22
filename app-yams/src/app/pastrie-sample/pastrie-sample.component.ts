import { Component, Input } from '@angular/core';
import { Pastrie } from '../pastrie';
import { PastriesService } from '../pastries.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pastrie-sample',
  templateUrl: './pastrie-sample.component.html',
  styleUrls: ['./pastrie-sample.component.scss']
})
export class PastrieSampleComponent {
  @Input() pastries: Pastrie[] = [];
  selectedPastrieId: string | null = null;
  selectedPastrie: Pastrie | null = null;

  constructor(private ps: PastriesService, private router: Router) {}

  ngOnInit(): void {
    this.ps.getPastries().subscribe(pastries => {
      this.pastries = pastries;
    });
  }
  navigateToCreatePastries(): void {
    this.router.navigateByUrl('/createPastrie');
  }

  toggleCard(pastrieId: string): void {
    if (this.selectedPastrieId === pastrieId) {
      this.selectedPastrieId = null; // Ferme la card si elle est déjà ouverte
    } else {
      this.selectedPastrieId = pastrieId; // Ouvre la card de la pâtisserie sélectionnée
      this.ps.getRecipe(pastrieId).subscribe(selectedPastrie => {
        this.selectedPastrie = selectedPastrie; // Assigner la pâtisserie sélectionnée à la variable selectedPastrie
      });
    }
  }
}