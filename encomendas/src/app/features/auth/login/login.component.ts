import { Component, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonModule, CardModule, FormsModule, InputTextModule, MessageModule, PasswordModule],
  styleUrl: './login.component.scss',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  readonly authenticated = output<void>();
  protected username = '';
  protected password = '';
  protected error = '';

  protected submit(): void {
    const user = this.username.trim().toLowerCase();
    this.authService.login(user, this.password).subscribe({
      next: () => {
        this.error = '';
        this.authenticated.emit();
        void this.router.navigateByUrl('/inicio');
      },
      error: () => (this.error = 'Confira seu usuário e senha para continuar.'),
    });
  }
}
