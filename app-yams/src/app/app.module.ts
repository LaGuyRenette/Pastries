import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PastriesComponent } from './pastries/pastries.component';
import { PastrieDetailsComponent } from './pastrie-details/pastrie-details.component';
import { BorderCardDirective } from './border-card.directive';
import { RoutingModule } from './routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SearchComponent } from './search/search.component';
import { PaginationComponent } from './pagination/pagination.component';
import { RegisterComponent } from './register/register.component';
import { PastrieSampleComponent } from './pastrie-sample/pastrie-sample.component';
import { CreatePastriesComponent } from './create-pastries/create-pastries.component';
import { UpdatePastrieComponent } from './update-pastrie/update-pastrie.component';

@NgModule({
  declarations: [
    AppComponent,
    PastriesComponent,
    PastrieDetailsComponent,
    BorderCardDirective,
    PageNotFoundComponent,
    SearchComponent,
    PaginationComponent,
    RegisterComponent,
    PastrieSampleComponent,
    CreatePastriesComponent,
    UpdatePastrieComponent,

  ],
  imports: [
    BrowserModule,
    RoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
