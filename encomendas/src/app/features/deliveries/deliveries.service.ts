import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Delivery } from '../../models';

interface ApiDelivery {
  id: number;
  residentId: number;
  residentName: string;
  block: string | null;
  unit: string;
  description: string;
  trackingCode: string | null;
  receivedAt: string;
  pickedUpAt: string | null;
  status: 'AGUARDANDO_RETIRADA' | 'RETIRADA';
}

@Injectable({ providedIn: 'root' })
export class DeliveriesService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/deliveries`;

  list(search = '', pendingOnly = false): Observable<Delivery[]> {
    let params = new HttpParams();
    if (search) params = params.set('search', search);
    if (pendingOnly) params = params.set('pendingOnly', true);
    return this.http
      .get<ApiDelivery[]>(this.apiUrl, { params })
      .pipe(map((items) => items.map((item) => this.toDelivery(item))));
  }

  create(delivery: Omit<Delivery, 'id' | 'receivedAt' | 'status'>): Observable<Delivery> {
    return this.http
      .post<ApiDelivery>(this.apiUrl, delivery)
      .pipe(map((item) => this.toDelivery(item)));
  }

  pickup(id: number): Observable<Delivery> {
    return this.http
      .patch<ApiDelivery>(`${this.apiUrl}/${id}/pickup`, {})
      .pipe(map((item) => this.toDelivery(item)));
  }

  private toDelivery(item: ApiDelivery): Delivery {
    return {
      id: item.id,
      residentId: item.residentId,
      description: item.description,
      trackingCode: item.trackingCode ?? '',
      receivedAt: item.receivedAt,
      status: item.status === 'AGUARDANDO_RETIRADA' ? 'pending' : 'picked-up',
    };
  }
}
