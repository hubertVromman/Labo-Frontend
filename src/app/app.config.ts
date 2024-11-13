import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { tokenInterceptor } from './interceptors/token.interceptor';
import { registerLocaleData } from '@angular/common';

import localeFr from '@angular/common/locales/fr';
import { dateInterceptor } from './interceptors/date.interceptor';
import { loggingInterceptor } from './interceptors/logging.interceptor';
registerLocaleData(localeFr);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideHttpClient(withInterceptors([tokenInterceptor, dateInterceptor]), withInterceptorsFromDi()),
    provideAnimations(),
    {provide: LOCALE_ID, useValue: 'fr-BE' },
    //{provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true},
  ],  
};
