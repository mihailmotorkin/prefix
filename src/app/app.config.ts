import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import { PrefixTheme } from '../../libs/primeng/custom-theme';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    providePrimeNG({
      theme: {
        preset: PrefixTheme,
        options: {
          darkModeSelector: 'none'
        }
      },
      inputVariant: 'filled'
    })
  ]
};
