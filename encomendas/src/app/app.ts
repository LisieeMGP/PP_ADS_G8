import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { AuthService } from './core/auth/auth.service';

@Component({
  imports: [
    AvatarModule,
    BreadcrumbModule,
    ButtonModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
  ],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  protected readonly authenticatedUser = computed(
    () => this.authService.currentUser() ?? 'Usuário autenticado',
  );
  protected readonly userInitials = computed(() => {
    const nameParts = this.authenticatedUser().trim().split(/\s+/).filter(Boolean);
    if (nameParts.length === 0) return '?';
    if (nameParts.length === 1) return nameParts[0].slice(0, 2).toUpperCase();
    return `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase();
  });

  protected get breadcrumbItems(): MenuItem[] {
    const label =
      this.router.url === '/inicio'
        ? 'Visão geral'
        : this.router.url === '/encomendas/registrar'
          ? 'Registrar encomenda'
          : this.router.url === '/moradores'
            ? 'Moradores'
            : this.router.url === '/encomendas/retirada'
              ? 'Registrar retirada'
              : 'Consultar encomendas';

    return [{ label: 'Condomínio' }, { label }];
  }

  protected logout(): void {
    this.router.navigateByUrl('/login');
  }

  protected get isLoginRoute(): boolean {
    return this.router.url === '/login';
  }
}
