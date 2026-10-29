import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject, throwError } from 'rxjs';
import { Delivery } from '../../../models';
import { DeliveriesService } from '../deliveries.service';
import { PickupPageComponent } from './pickup-page.component';

describe('PickupPageComponent', () => {
  const delivery: Delivery = {
    id: 1,
    residentId: 2,
    description: 'Caixa',
    trackingCode: 'BR111222333',
    receivedAt: '2026-10-29',
    status: 'pending',
  };
  const deliveriesServiceMock = { list: vi.fn(), pickup: vi.fn() };
  let fixture: ComponentFixture<PickupPageComponent>;

  beforeEach(async () => {
    deliveriesServiceMock.list.mockReset();
    deliveriesServiceMock.list.mockReturnValue(of([delivery]));
    deliveriesServiceMock.pickup.mockReset();
    deliveriesServiceMock.pickup.mockReturnValue(of(delivery));
    await TestBed.configureTestingModule({
      imports: [PickupPageComponent],
      providers: [{ provide: DeliveriesService, useValue: deliveriesServiceMock }],
    }).compileComponents();
    fixture = TestBed.createComponent(PickupPageComponent);
    fixture.detectChanges();
  });

  function selectDeliveryAndConfirm(): void {
    Object.assign(fixture.componentInstance, { selectedId: delivery.id });
    fixture.detectChanges();
    fixture.nativeElement.querySelector('button').click();
    fixture.detectChanges();
  }

  it('shows success after the pickup request completes', () => {
    selectDeliveryAndConfirm();

    expect(deliveriesServiceMock.pickup).toHaveBeenCalledWith(delivery.id);
    expect(fixture.nativeElement.querySelector('.pickup-feedback').textContent).toContain(
      'Retirada registrada com sucesso.',
    );
    expect(fixture.nativeElement.querySelector('button').textContent).toContain(
      'Confirmar retirada',
    );
  });

  it('updates the button and feedback after an asynchronous successful response', async () => {
    const response = new Subject<Delivery>();
    deliveriesServiceMock.pickup.mockReturnValue(response);
    selectDeliveryAndConfirm();
    fixture.autoDetectChanges();

    expect(fixture.nativeElement.querySelector('button').textContent).toContain('Confirmando...');

    response.next(delivery);
    response.complete();
    await fixture.whenStable();

    expect(fixture.nativeElement.querySelector('.pickup-feedback').textContent).toContain(
      'Retirada registrada com sucesso.',
    );
    expect(fixture.nativeElement.querySelector('button').textContent).toContain(
      'Confirmar retirada',
    );
  });

  it('shows an error when the pickup request fails', () => {
    deliveriesServiceMock.pickup.mockReturnValue(throwError(() => new Error('unavailable')));
    selectDeliveryAndConfirm();

    expect(fixture.nativeElement.querySelector('.pickup-feedback').textContent).toContain(
      'Não foi possível registrar a retirada.',
    );
    expect(fixture.nativeElement.querySelector('button').disabled).toBe(false);
  });
});
