import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'splash2', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'add-edit-item',
    loadChildren: () => import('./add-edit-item/add-edit-item.module').then( m => m.AddEditItemPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  // {
  //   path: 'splash',
  //   loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)
  // },
  {
    path: 'splash2',
    loadChildren: () => import('./splash2/splash2.module').then( m => m.Splash2PageModule)
  },
  // {
  //   path: 'map',
  //   loadChildren: () => import('./map/map.module').then( m => m.MapPageModule)
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
