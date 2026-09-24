import { Component, input, model, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Delivery } from '../../../models';

@Component({
  selector: 'app-pickup',
  standalone: true,
  imports: [ButtonModule, DialogModule],
  styleUrl: './pickup.component.scss',
  templateUrl: './pickup.component.html',
})
export class PickupComponent {
  readonly delivery = input<Delivery | undefined>(undefined);
  readonly residentName = input('');
  readonly visible = model(false);
  readonly confirmed = output<number>();
  readonly closed = output<void>();

  protected confirm(): void {
    const delivery = this.delivery();
    if (!delivery) return;
    this.confirmed.emit(delivery.id);
    this.visible.set(false);
  }
}
