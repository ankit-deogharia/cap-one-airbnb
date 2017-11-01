import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Ng2BootstrapModule } from 'ng-bootstrap'

import { AppComponent } from './app.component';
import { VisComponent } from './vis/vis.component';
import { InsightsComponent } from './insights/insights.component';
import { GraphComponent } from './vis/graph/graph.component';

const appRoutes: Routes = [
  { path: 'vis', component: VisComponent },
  { path: 'insights',      component: InsightsComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    VisComponent,
    InsightsComponent,
    GraphComponent,
  ],
  imports: [
    BrowserModule,
    Ng2BootstrapModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
