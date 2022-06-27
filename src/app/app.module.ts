import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFirestoreModule } from '@angular/fire/compat/firestore/'; 
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogoComponent } from './logo/logo.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { MainComponent } from './main/main.component';
import { AsideTagsComponent } from './aside-tags/aside-tags.component';
import { HttpClientModule } from '@angular/common/http';
import { HashtagButtonComponent } from './hashtag-button/hashtag-button.component';
import { FooterComponent } from './footer/footer.component';
import { DatenschutzComponent } from './datenschutz/datenschutz.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { HashtagComponent } from './hashtag/hashtag.component';
import { HashtagMaterialsComponent } from './hashtag-materials/hashtag-materials.component';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { HamburgerTagComponent } from './hamburger-tag/hamburger-tag.component';
import { MyTagsComponent } from './my-tags/my-tags.component';
import { TagStudentsComponent } from './tag-students/tag-students.component';

@NgModule({
  declarations: [
    AppComponent,
    LogoComponent,
    HomeComponent,
    NavigationComponent,
    MainComponent,
    AsideTagsComponent,
    HashtagButtonComponent,
    FooterComponent,
    DatenschutzComponent,
    ContactFormComponent,
    ImpressumComponent,
    HashtagComponent,
    HashtagMaterialsComponent,
    StarRatingComponent,
    HamburgerTagComponent,
    MyTagsComponent,
    TagStudentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
