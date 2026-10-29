import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SelectModule } from 'primeng/select';
import { Delivery } from '../../../models';
import { DeliveriesService } from '../deliveries.service';

@Component({
  selector: 'app-pickup-page',
  imports: [ButtonModule, CardModule, FormsModule, SelectModule],
  styleUrl: './pickup-page.component.scss',
  templateUrl: './pickup-page.component.html',
})
export class PickupPageComponent {
  private readonly deliveriesService = inject(DeliveriesService);
  protected deliveries: Delivery[] = [];
  protected selectedId: number | undefined;
  protected message = '';
  protected messageType: 'success' | 'error' | '' = '';
  protected confirming = false;

  constructor() {
    this.load();
  }

  protected confirm(): void {
    if (!this.selectedId || this.confirming) return;

    this.message = '';
    this.messageType = '';
    this.confirming = true;
    this.deliveriesService.pickup(this.selectedId).subscribe({
      next: () => {
        this.message = 'Retirada registrada com sucesso.';
        this.messageType = 'success';
        this.confirming = false;
        this.load();
        this.selectedId = undefined;
      },
      error: () => {
        this.message = 'Não foi possível registrar a retirada. Tente novamente.';
        this.messageType = 'error';
        this.confirming = false;
      },
    });
  }

  private load(): void {
    this.deliveriesService.list('', true).subscribe((deliveries) => (this.deliveries = deliveries));
  }
}
