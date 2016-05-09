import { bootstrap } from "@angular/platform-browser-dynamic";
import { enableProdMode, provide } from "@angular/core";
import { HTTP_PROVIDERS } from "@angular/http";
import { ROUTER_PROVIDERS } from "@angular/router";
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import "./main.scss";

import { AppComponent } from "./app";

declare const PROD;
if (PROD) { enableProdMode(); }

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    provide(LocationStrategy, { useClass: HashLocationStrategy })
]).then(() => {
    (<any>$(".button-collapse")).sideNav({
        closeOnClick: true
    });
});
