import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { Ng2BootstrapModule } from 'ng-bootstrap';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { AppComponent } from './app.component';
import { HomeComponent } from './home-component/home-component.component';
import { VisComponent } from './vis/vis.component';
import { InsightsComponent } from './insights/insights.component';
import { GraphComponent } from './vis/graph/graph.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'vis', component: VisComponent },
  { path: 'insights',      component: InsightsComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }

];

@NgModule({
  declarations: [
    AppComponent,
    VisComponent,
    InsightsComponent,
    GraphComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    Ng2BootstrapModule.forRoot(),
    Ng4LoadingSpinnerModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
