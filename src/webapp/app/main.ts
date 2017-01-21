import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule }              from './app.module';

window.onload = function() {
    platformBrowserDynamic().bootstrapModule(AppModule);
}