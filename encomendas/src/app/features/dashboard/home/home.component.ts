import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { Delivery, Resident } from '../../../models';
import { ResidentsService } from '../../residents/residents.service';
import { DeliveriesService } from '../../deliveries/deliveries.service';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule, CardModule, RouterLink, TagModule],
  styleUrl: './home.component.scss',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly residentsService = inject(ResidentsService);
  private readonly deliveriesService = inject(DeliveriesService);
  readonly residents = signal<Resident[]>([]);
  readonly deliveries = signal<Delivery[]>([]);
  readonly userName = computed(() => this.authService.currentUser() ?? 'usuário');
  readonly currentDate = computed(() =>
    new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
      weekday: 'long',
    })
      .format(new Date())
      .toUpperCase(),
  );
  readonly greeting = computed(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  });
  readonly pendingCount = computed(
    () => this.deliveries().filter((item) => item.status === 'pending').length,
  );
  readonly pendingDeliveries = computed(() =>
    this.deliveries()
      .filter((item) => item.status === 'pending')
      .slice(0, 3),
  );

  constructor() {}

  ngOnInit(): void {
    this.residentsService.list().subscribe((residents) => this.residents.set(residents));
    this.deliveriesService.list().subscribe((deliveries) => this.deliveries.set(deliveries));
  }

  residentName(delivery: Delivery): string {
    return this.residents().find((item) => item.id === delivery.residentId)?.name ?? 'Morador';
  }

  residentUnit(delivery: Delivery): string {
    const resident = this.residents().find((item) => item.id === delivery.residentId);
    return resident ? `${resident.block} / ${resident.unit}` : '-';
  }
}
