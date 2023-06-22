import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PastriesService } from '../pastries.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-pastries',
  templateUrl: './create-pastries.component.html',
  styleUrls: ['./create-pastries.component.scss']
})
export class CreatePastriesComponent {
  newPastrie: any = null;
  pastrieForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private ps: PastriesService, private router: Router) { }
  ngOnInit(): void {
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
  submitForm(): void {
    if (this.pastrieForm.valid) {
      const formData = this.pastrieForm.value;
      this.ps.createPastrie(formData).subscribe((newPastrie) => {
        this.pastrieForm.reset();
        this.newPastrie = newPastrie; 
        console.log('Nouvelle pâtisserie créée:', newPastrie);
        this.router.navigate(['/sample'], { queryParams: { pastry: JSON.stringify(newPastrie) } });
      });
    }
  }

}
