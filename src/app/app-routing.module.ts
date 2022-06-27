import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DatenschutzComponent } from './datenschutz/datenschutz.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ImpressumComponent } from './impressum/impressum.component';

const routes: Routes = [{ path: "", redirectTo: "home", pathMatch: "full" },
{ path: "home", component: HomeComponent },
{ path: "contact", component: ContactFormComponent },
{ path: "imp", component: ImpressumComponent },
{ path: "datenschutz", component: DatenschutzComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
