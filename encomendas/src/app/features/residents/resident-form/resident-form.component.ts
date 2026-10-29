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
  protected message = '';
  protected messageType: 'success' | 'error' | '' = '';
  protected saving = false;

  protected submit(): void {
    if (this.saving || !this.name.trim() || !this.unit.trim()) return;

    this.message = '';
    this.messageType = '';
    this.saving = true;
    this.residentsService
      .create({ name: this.name.trim(), block: this.block.trim() || '-', unit: this.unit.trim() })
      .subscribe({
        next: (resident) => {
          this.saved.emit(resident);
          this.name = '';
          this.block = '';
          this.unit = '';
          this.message = 'Morador cadastrado com sucesso.';
          this.messageType = 'success';
          this.saving = false;
        },
        error: () => {
          this.message =
            'Não foi possível cadastrar o morador. Verifique os dados e tente novamente.';
          this.messageType = 'error';
          this.saving = false;
        },
      });
  }
}
