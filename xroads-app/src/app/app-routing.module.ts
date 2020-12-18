import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DeaconReviewComponent } from './deacon/deacon-review/deacon-review.component';
import { NurseryReviewComponent } from './nursery/nursery-review/nursery-review.component';
import { UsherReviewComponent } from './usher/usher-review/usher-review.component';
import { AttendeeDashboardComponent } from './attendee/attendee-dashboard/attendee-dashboard.component';

export const routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent, text: 'Home', icon: 'k-i-globe-outline' },
  { path: 'deacon', component: DeaconReviewComponent, text: 'Deacon', icon: 'k-i-wrench' },
  { path: 'nursery', component: NurseryReviewComponent, text: 'Nursery', icon: 'k-i-preview' },
  { path: 'usher', component: UsherReviewComponent, text: 'Usher', icon: 'k-i-gears' },
  { path: 'attendee', component: AttendeeDashboardComponent, text: 'Attendee', icon: 'k-i-gears' },
  // {
  //   path: 'products',
  //   loadChildren: () =>
  //     import('./products/products.module').then((m) => m.ProductsModule),
  // },
  // { path: 'discounts', component: DiscountComponent },
  // { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
