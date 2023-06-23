import { Component, Input } from '@angular/core';
import { Pastrie } from '../pastrie';
import { PastriesService } from '../pastries.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pastrie-sample',
  templateUrl: './pastrie-sample.component.html',
  styleUrls: ['./pastrie-sample.component.scss']
})
export class PastrieSampleComponent {
  @Input() pastries: Pastrie[] = [];
  selectedPastrieId: string | null = null;
  selectedPastrie: Pastrie | null = null;

  constructor(private ps: PastriesService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.ps.getPastries().subscribe(pastries => {
      this.pastries = pastries;
    });

    this.route.queryParams.subscribe((params) => {
      const pastryParam = params['pastry'];
      if (pastryParam) {
        try {
          this.pastries = JSON.parse(pastryParam);
        } catch (error) {
          console.error('Error parsing pastry JSON:', error);
        }
      }
    });

  }
  navigateToCreatePastries(): void {
    this.router.navigateByUrl('/createPastrie');
  }

  toggleCard(pastrieId: string): void {
    console.log(this.selectedPastrieId)
    if (this.selectedPastrieId === pastrieId) {
      this.selectedPastrieId = null; // Ferme la card si elle est déjà ouverte
    } else {
      this.selectedPastrieId = pastrieId; // Ouvre la card de la pâtisserie sélectionnée
      this.ps.getRecipe(pastrieId).subscribe(selectedPastrie => {
        this.selectedPastrie = selectedPastrie; // Assigner la pâtisserie sélectionnée à la variable selectedPastrie
      });
    }
  }
  getPastriePropertyValue(pastrie: any, property: string): string {
    if (typeof pastrie === 'object' && pastrie !== null && 'name' in pastrie) {
      return pastrie[property];
    }
    return '';
  }
  updatePastrie(pastrieId: string|undefined): void {
    console.log(pastrieId);
    this.router.navigate(['/updatePastrie', pastrieId]);
  }

  deletePastrie(pastrieId: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette pâtisserie ?')) {
      this.ps.deletePastrie(pastrieId).subscribe(() => {
        // Mettez à jour la liste des pâtisseries après la suppression
        this.ps.getPastries().subscribe(pastries => {
          this.pastries = pastries;
        });
        // Réinitialisez les valeurs sélectionnées
        this.selectedPastrieId = null;
        this.selectedPastrie = null;
      });
    }
  }
  getCardColor(index: number): string {
    const colors = ['#f6bd60', '#f7ede2', '#f5cac3', '#84a59d', '#f28482'];
    const colorIndex = index % colors.length;
    return colors[colorIndex];
  }
  
}