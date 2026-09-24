import { Component, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { Resident } from '../../../models';
import { ResidentsService } from '../residents.service';

@Component({
  selector: 'app-resident-form',
  standalone: true,
  imports: [ButtonModule, CardModule, FormsModule, InputTextModule],
  styleUrl: './resident-form.component.scss',
  templateUrl: './resident-form.component.html',
})
export class ResidentFormComponent {
  private readonly residentsService = inject(ResidentsService);
  readonly saved = output<Resident>();
  protected name = '';
  protected block = '';
  protected unit = '';

  protected submit(): void {
    if (!this.name.trim() || !this.unit.trim()) return;
    this.residentsService
      .create({ name: this.name.trim(), block: this.block.trim() || '-', unit: this.unit.trim() })
      .subscribe((resident) => {
        this.saved.emit(resident);
        this.name = '';
        this.block = '';
        this.unit = '';
      });
  }
}
