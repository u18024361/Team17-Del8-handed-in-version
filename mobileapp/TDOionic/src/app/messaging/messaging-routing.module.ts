import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessagingPage } from './messaging.page';

const routes: Routes = [
  {
    path: '',
    component: MessagingPage
  },
  {
    path: 'reply',
    loadChildren: () => import('./reply/reply.module').then( m => m.ReplyPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessagingPageRoutingModule {}
