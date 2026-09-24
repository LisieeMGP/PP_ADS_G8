import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import Aura from '@primeuix/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/auth/auth.interceptor';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: { darkModeSelector: false },
      },
      license: 'eyJpZCI6ImIyN2E5NmQ4LTM4Y2ItNDBjNy1hNjAyLTgzYmIyMzViZmQ5YiIsInByb2R1Y3QiOiJwcmltZXVpIiwidGllciI6ImNvbW11bml0eSIsInR5cGUiOiJkZXYiLCJpYXQiOjE3OTAwNDA1NzMsImV4cCI6MTgyMTU3NjU3M30.KwKnnblYTZ44dTmhBOLWAsFWXNtY4YreZa4TG68WfKbOzNuSeKaz1b26ncu0vjN0avq5P-QaVq-BPdqEkV98Dw'
    }),
  ]
};
