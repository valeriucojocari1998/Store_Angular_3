import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExternalWrapperComponent } from './shared/components/wrappers/external-wrapper/external-wrapper.component';
import { MainWrapperComponent } from './shared/components/wrappers/main-wrapper/main-wrapper.component';

const routes: Routes = [
  {
    path: 'home',
    component: MainWrapperComponent,
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'products',
    component: MainWrapperComponent,
    loadChildren: () =>
      import('./modules/products/products.module').then(
        (m) => m.ProductsModule
      ),
  },
  {
    path: 'cart',
    component: MainWrapperComponent,
    loadChildren: () =>
      import('./modules/cart/cart.module').then((m) => m.CartModule),
  },
  {
    path: 'about',
    component: MainWrapperComponent,
    loadChildren: () =>
      import('./modules/about/about.module').then((m) => m.AboutModule),
  },
  {
    path: 'login',
    component: ExternalWrapperComponent,
    loadChildren: () =>
      import('./modules/login/login.module').then((m) => m.LoginModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
