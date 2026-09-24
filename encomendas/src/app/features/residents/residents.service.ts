import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resident } from '../../models';

@Injectable({ providedIn: 'root' })
export class ResidentsService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3001/residents';

  list(): Observable<Resident[]> {
    return this.http.get<Resident[]>(this.apiUrl);
  }

  create(resident: Omit<Resident, 'id'>): Observable<Resident> {
    return this.http.post<Resident>(this.apiUrl, {
      name: resident.name,
      block: resident.block === '-' ? undefined : resident.block,
      unit: resident.unit,
    });
  }
}