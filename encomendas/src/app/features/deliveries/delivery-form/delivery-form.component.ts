import { Component, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { Delivery, Resident } from '../../../models';
import { ResidentsService } from '../../residents/residents.service';
import { DeliveriesService } from '../deliveries.service';

@Component({
  selector: 'app-delivery-form',
  standalone: true,
  imports: [ButtonModule, CardModule, FormsModule, InputTextModule, SelectModule],
  styleUrl: './delivery-form.component.scss',
  templateUrl: './delivery-form.component.html',
})
export class DeliveryFormComponent {
  private readonly residentsService = inject(ResidentsService);
  private readonly deliveriesService = inject(DeliveriesService);
  readonly residents = signal<Resident[]>([]);
  readonly saved = output<Omit<Delivery, 'id' | 'receivedAt' | 'status'>>();
  protected residentId = 1;
  protected description = '';
  protected trackingCode = '';

  constructor() {
    this.residentsService.list().subscribe((residents) => this.residents.set(residents));
  }

  protected submit(): void {
    if (!this.description.trim() || !this.trackingCode.trim()) return;
    this.deliveriesService
      .create({
        residentId: this.residentId,
        description: this.description.trim(),
        trackingCode: this.trackingCode.trim().toUpperCase(),
      })
      .subscribe((delivery) => {
        this.saved.emit(delivery);
        this.description = '';
        this.trackingCode = '';
      });
  }
}
