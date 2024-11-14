import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-error.component.html',
  styleUrl: './form-error.component.scss'
})
export class FormErrorComponent {

  @Input() formGroup: FormGroup | undefined;
  @Input() controlName: string | undefined;

  get ctrl() {
    return this.formGroup?.get(this.controlName!);
  }
}
