import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AppGaurdGuard } from './gaurds/app-gaurd.guard';
import { IndividualComponent } from './individual/individual.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'Home',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule), canActivate: [AppGaurdGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
  },
  {
    path: 'group',
    loadChildren: () => import('./group/group.module').then( m => m.GroupPageModule), canActivate: [AppGaurdGuard]
  },
  {
    path: 'about',component:AboutComponent
  
  },
  {
    path: 'messaging',
    loadChildren: () => import('./messaging/messaging.module').then( m => m.MessagingPageModule), canActivate: [AppGaurdGuard]
  },
  {
    path: 'individual',component:IndividualComponent,  canActivate: [AppGaurdGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
