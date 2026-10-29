import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SelectModule } from 'primeng/select';
import { finalize, TimeoutError, timeout } from 'rxjs';
import { Delivery } from '../../../models';
import { DeliveriesService } from '../deliveries.service';

const REQUEST_TIMEOUT_MS = 20_000;

@Component({
  selector: 'app-pickup-page',
  imports: [ButtonModule, CardModule, FormsModule, SelectModule],
  styleUrl: './pickup-page.component.scss',
  templateUrl: './pickup-page.component.html',
})
export class PickupPageComponent {
  private readonly deliveriesService = inject(DeliveriesService);
  protected readonly deliveries = signal<Delivery[]>([]);
  protected selectedId: number | undefined;
  protected readonly message = signal('');
  protected readonly messageType = signal<'success' | 'error' | ''>('');
  protected readonly confirming = signal(false);

  constructor() {
    this.load();
  }

  protected confirm(): void {
    if (!this.selectedId || this.confirming()) return;

    this.message.set('');
    this.messageType.set('');
    this.confirming.set(true);
    this.deliveriesService
      .pickup(this.selectedId)
      .pipe(
        timeout({ first: REQUEST_TIMEOUT_MS }),
        finalize(() => this.confirming.set(false)),
      )
      .subscribe({
        next: () => {
          this.message.set('Retirada registrada com sucesso.');
          this.messageType.set('success');
          this.load();
          this.selectedId = undefined;
        },
        error: (error: unknown) => {
          this.message.set(
            error instanceof TimeoutError
              ? 'A API demorou para responder. Verifique se a retirada foi registrada antes de tentar novamente.'
              : 'Não foi possível registrar a retirada. Tente novamente.',
          );
          this.messageType.set('error');
        },
      });
  }

  private load(): void {
    this.deliveriesService
      .list('', true)
      .subscribe((deliveries) => this.deliveries.set(deliveries));
  }
}
