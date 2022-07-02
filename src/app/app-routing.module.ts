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

const routes: Routes = [{ path: "", redirectTo: "home", pathMatch: "full" },
{ path: "home", component: HomeComponent },
{ path: "contact", component: ContactFormComponent },
{ path: "imp", component: ImpressumComponent },
{ path: "hashtag", component: HashtagComponent },
{ path: "materials/:name", component: HashtagMaterialsComponent },
{ path: "datenschutz", component: DatenschutzComponent },
{ path: "tagStudents", component: TagStudentsComponent},
{ path: "myTags", component: MyTagsComponent},
{ path: "tagContent/:tag", component: TagContentComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
