import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenusModule } from '@progress/kendo-angular-menu';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { ToolBarModule } from '@progress/kendo-angular-toolbar';
import { DeaconReviewComponent } from './deacon/deacon-review/deacon-review.component';
import { UsherReviewComponent } from './usher/usher-review/usher-review.component';
import { NurseryReviewComponent } from './nursery/nursery-review/nursery-review.component';
import { CustomToolComponent } from './custom-tool.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { NgrxAutoEntityModule } from '@briebug/ngrx-auto-entity';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {appReducer, appMetaReducers} from './state/app.state'



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DeaconReviewComponent,
    UsherReviewComponent,
    NurseryReviewComponent,
    CustomToolComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonsModule,
    BrowserAnimationsModule,
    MenusModule,
    LayoutModule,
    ToolBarModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreModule.forRoot(appReducer, { metaReducers: appMetaReducers }),
    EffectsModule.forRoot([]),
    NgrxAutoEntityModule.forRoot() // Add this!
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
