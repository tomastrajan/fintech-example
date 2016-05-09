import {Component, OnInit } from "@angular/core";
import {ROUTER_DIRECTIVES, Routes, Router} from "@angular/router";

import { DashboardComponent } from "../dashboard";
import { ClientsComponent } from "../clients";

@Component({
    selector: "ft-app",
    template: require("./app-component.html"),
    directives: [ROUTER_DIRECTIVES]
})
@Routes([
    { path: "/dashboard", component: DashboardComponent },
    { path: "/clients", component: ClientsComponent }
])
export class AppComponent implements OnInit {

    private year: number;

    constructor(private router: Router) {}

    public ngOnInit(): any {
        this.year = new Date().getFullYear();
        this.router.navigate(["/dashboard"]);
    }

}
