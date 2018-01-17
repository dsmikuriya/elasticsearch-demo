import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchViewComponent } from './components/search/search-view/search-view.component';

const routes: Routes = [
    { path: 'search', component: SearchViewComponent },
    { path: '', redirectTo: '/search', pathMatch: 'full' }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
