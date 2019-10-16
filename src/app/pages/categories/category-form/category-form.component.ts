import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  save(): void {
    console.log(this.formGroup.value);
  }

  private buildForm(): void {
    this.formGroup = this.fb.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]]
    })
  }
}
