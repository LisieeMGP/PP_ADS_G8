import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject, throwError } from 'rxjs';
import { Resident } from '../../../models';
import { ResidentsService } from '../residents.service';
import { ResidentFormComponent } from './resident-form.component';

describe('ResidentFormComponent', () => {
  const resident: Resident = { id: 1, name: 'Ana Pereira', block: 'C', unit: '305' };
  const residentsServiceMock = { create: vi.fn() };
  let fixture: ComponentFixture<ResidentFormComponent>;

  beforeEach(async () => {
    residentsServiceMock.create.mockReset();
    residentsServiceMock.create.mockReturnValue(of(resident));
    await TestBed.configureTestingModule({
      imports: [ResidentFormComponent],
      providers: [{ provide: ResidentsService, useValue: residentsServiceMock }],
    }).compileComponents();
    fixture = TestBed.createComponent(ResidentFormComponent);
    fixture.detectChanges();
  });

  function enterResidentDetails(): void {
    const name = fixture.nativeElement.querySelector(
      'input[name="residentName"]',
    ) as HTMLInputElement;
    const block = fixture.nativeElement.querySelector(
      'input[name="residentBlock"]',
    ) as HTMLInputElement;
    const unit = fixture.nativeElement.querySelector(
      'input[name="residentUnit"]',
    ) as HTMLInputElement;

    for (const [input, value] of [
      [name, 'Ana Pereira'],
      [block, 'C'],
      [unit, '305'],
    ] as const) {
      input.value = value;
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }

  async function submit(): Promise<void> {
    fixture.nativeElement
      .querySelector('form')
      .dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  }

  it('shows success after saving', async () => {
    enterResidentDetails();
    await submit();

    expect(fixture.nativeElement.querySelector('.form-feedback').textContent).toContain(
      'Morador cadastrado com sucesso.',
    );
    expect(fixture.nativeElement.querySelector('button').textContent).toContain('Salvar morador');
  });

  it('updates the button and feedback after an asynchronous successful response', async () => {
    const response = new Subject<Resident>();
    residentsServiceMock.create.mockReturnValue(response);
    fixture.autoDetectChanges();
    enterResidentDetails();
    fixture.nativeElement
      .querySelector('form')
      .dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('button').textContent).toContain('Salvando...');

    response.next(resident);
    response.complete();
    await fixture.whenStable();

    expect(fixture.nativeElement.querySelector('.form-feedback').textContent).toContain(
      'Morador cadastrado com sucesso.',
    );
    expect(fixture.nativeElement.querySelector('button').textContent).toContain('Salvar morador');
  });

  it('shows an error and preserves the form when saving fails', async () => {
    residentsServiceMock.create.mockReturnValue(throwError(() => new Error('conflict')));
    enterResidentDetails();
    await submit();

    expect(fixture.nativeElement.querySelector('.form-feedback').textContent).toContain(
      'Não foi possível cadastrar o morador.',
    );
    expect(fixture.nativeElement.querySelector('input[name="residentName"]').value).toBe(
      'Ana Pereira',
    );
  });
});
