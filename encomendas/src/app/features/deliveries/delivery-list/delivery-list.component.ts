import { DatePipe } from '@angular/common';
import { Component, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Delivery, Resident } from '../../../models';
import { PickupComponent } from '../pickup/pickup.component';
import { DeliveriesService } from '../deliveries.service';
import { ResidentsService } from '../../residents/residents.service';

@Component({
  selector: 'app-delivery-list',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    CheckboxModule,
    DatePipe,
    FormsModule,
    InputTextModule,
    PickupComponent,
    TableModule,
    TagModule,
  ],
  styleUrl: './delivery-list.component.scss',
  templateUrl: './delivery-list.component.html',
})
export class DeliveryListComponent {
  private readonly deliveriesService = inject(DeliveriesService);
  private readonly residentsService = inject(ResidentsService);
  readonly residents = signal<Resident[]>([]);
  readonly deliveries = signal<Delivery[]>([]);
  readonly pickup = output<number>();
  protected searchTerm = '';
  protected pendingOnly = false;
  protected pickupVisible = false;
  protected selectedDelivery: Delivery | undefined;

  constructor() {
    this.residentsService.list().subscribe((residents) => this.residents.set(residents));
    this.deliveriesService.list().subscribe((deliveries) => this.deliveries.set(deliveries));
  }

  get filteredDeliveries(): Delivery[] {
    const term = this.searchTerm.toLowerCase();
    return this.deliveries().filter((item) => {
      const name = this.residentName(item).toLowerCase();
      const unit = this.residentUnit(item).toLowerCase();
      return (
        (!term ||
          name.includes(term) ||
          unit.includes(term) ||
          item.trackingCode.toLowerCase().includes(term)) &&
        (!this.pendingOnly || item.status === 'pending')
      );
    });
  }

  residentName(delivery: Delivery): string {
    return this.residents().find((item) => item.id === delivery.residentId)?.name ?? 'Morador';
  }

  residentUnit(delivery: Delivery): string {
    const resident = this.residents().find((item) => item.id === delivery.residentId);
    return resident ? `${resident.block} / ${resident.unit}` : '-';
  }

  protected openPickup(delivery: Delivery): void {
    this.selectedDelivery = delivery;
    this.pickupVisible = true;
  }

  protected markAsPickedUp(deliveryId: number): void {
    this.deliveriesService.pickup(deliveryId).subscribe(() => {
      this.deliveries.set(
        this.deliveries().map((item) =>
          item.id === deliveryId ? { ...item, status: 'picked-up' } : item,
        ),
      );
      this.pickupVisible = false;
    });
  }
}
