import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { tokenInterceptor } from './interceptors/token.interceptor';
import { loggingInterceptor } from './interceptors/logging.interceptor';
import { LoggingInterceptor } from './interceptors/logging2.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideHttpClient(withInterceptors([tokenInterceptor]), withInterceptorsFromDi()),
    provideAnimations(),
    //{provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true},
  ],  
};
