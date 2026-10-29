import { Component, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { finalize, TimeoutError, timeout } from 'rxjs';
import { Resident } from '../../../models';
import { ResidentsService } from '../residents.service';

const REQUEST_TIMEOUT_MS = 20_000;

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
  protected readonly message = signal('');
  protected readonly messageType = signal<'success' | 'error' | ''>('');
  protected readonly saving = signal(false);

  protected submit(): void {
    if (this.saving() || !this.name.trim() || !this.unit.trim()) return;

    this.message.set('');
    this.messageType.set('');
    this.saving.set(true);
    this.residentsService
      .create({ name: this.name.trim(), block: this.block.trim() || '-', unit: this.unit.trim() })
      .pipe(
        timeout({ first: REQUEST_TIMEOUT_MS }),
        finalize(() => this.saving.set(false)),
      )
      .subscribe({
        next: (resident) => {
          this.saved.emit(resident);
          this.name = '';
          this.block = '';
          this.unit = '';
          this.message.set('Morador cadastrado com sucesso.');
          this.messageType.set('success');
        },
        error: (error: unknown) => {
          this.message.set(
            error instanceof TimeoutError
              ? 'A API demorou para responder. Verifique se o morador foi cadastrado antes de tentar novamente.'
              : 'Não foi possível cadastrar o morador. Verifique os dados e tente novamente.',
          );
          this.messageType.set('error');
        },
      });
  }
}
