import { bootstrap } from "@angular/platform-browser-dynamic";
import { enableProdMode, provide } from "@angular/core";
import { HTTP_PROVIDERS } from "@angular/http";
import { ROUTER_PROVIDERS } from "@angular/router";
import { provideStore } from "@ngrx/store";
import {
    COMMON_DIRECTIVES,
    LocationStrategy,
    HashLocationStrategy
} from "@angular/common";

import { AppComponent, appReducer } from "./app";
// import {instrumentStore} from '@ngrx/devtools';

declare const require: any;
declare const PROD: boolean;
if (PROD) {
    enableProdMode();
}

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    provide(LocationStrategy, { useClass: HashLocationStrategy }),
    provideStore(appReducer)
    /*, instrumentStore()*/
]).then(() => {
    (<any>$(".button-collapse")).sideNav({
        closeOnClick: true
    });
});
