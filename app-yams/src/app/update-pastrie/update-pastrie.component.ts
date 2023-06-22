import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PastriesService } from '../pastries.service';
import { Pastrie } from '../pastrie';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-pastrie',
  templateUrl: './update-pastrie.component.html',
  styleUrls: ['./update-pastrie.component.scss']
})
export class UpdatePastrieComponent implements OnInit {
  pastrieForm: FormGroup;
  pastrieId: string = '';
  newPastrie: any;

  constructor(
    private fb: FormBuilder,
    private pastriesService: PastriesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.pastrieForm = this.fb.group({
      name: ['', Validators.required],
      ref: ['', Validators.required],
      description: ['', Validators.required],
      url: ['', Validators.required],
      quantity: ['', Validators.required],
      order: ['', Validators.required],
      like: ['', Validators.required],
      tags: ['', Validators.required],
      choice: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.pastrieId = params['id'];
      this.loadPastrieData();
    });
  }

  loadPastrieData(): void {
    this.pastriesService.getRecipe(this.pastrieId).subscribe(pastrie => {
      this.populateFormWithPastrieData(pastrie);
    });
  }

  populateFormWithPastrieData(pastrie: Pastrie): void {
    console.log(pastrie);
    this.pastrieForm.patchValue({
      name: pastrie.name,
      ref: pastrie.ref,
      description: pastrie.description,
      url: pastrie.url,
      quantity: pastrie.quantity,
      order: pastrie.order,
      like: pastrie.like,
      tags: pastrie.tags,
      choice: pastrie.choice
    });
  }

  updatePastrie(): void {
    const updatedPastrie: Pastrie = {
      id: this.pastrieId,
      ...this.pastrieForm.value
    };

    this.pastriesService.updatePastrie(updatedPastrie).subscribe(() => {
      this.router.navigate(['/pastries']);
    });
  }
}