import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DatenschutzComponent } from './datenschutz/datenschutz.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { HashtagComponent } from './hashtag/hashtag.component';
import { HashtagMaterialsComponent } from './hashtag-materials/hashtag-materials.component';
import { TagStudentsComponent } from './tag-students/tag-students.component';
import { MyTagsComponent } from './my-tags/my-tags.component';
import { TagContentComponent } from './tag-content/tag-content.component';
import { LoginComponent } from './login/login.component';
import { UserResolver } from './user.resolver';

const routes: Routes = [{ path: "", redirectTo: "login", pathMatch: "full" },
{ path: "login", component: LoginComponent },
{ path: "home", component: HomeComponent, resolve: {
  isLoggedIn: UserResolver
} },
{ path: "contact", component: ContactFormComponent, resolve: {
  isLoggedIn: UserResolver
} },
{ path: "imp", component: ImpressumComponent, resolve: {
  isLoggedIn: UserResolver
} },
{ path: "hashtag", component: HashtagComponent, resolve: {
  isLoggedIn: UserResolver
} },
{ path: "materials/:name", component: HashtagMaterialsComponent, resolve: {
  isLoggedIn: UserResolver
} },
{ path: "datenschutz", component: DatenschutzComponent, resolve: {
  isLoggedIn: UserResolver
} },
{ path: "tagStudents", component: TagStudentsComponent, resolve: {
  isLoggedIn: UserResolver
}},
{ path: "myTags", component: MyTagsComponent, resolve: {
  isLoggedIn: UserResolver
}},
{ path: "tagContent/:tag", component: TagContentComponent, resolve: {
  isLoggedIn: UserResolver
}}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
