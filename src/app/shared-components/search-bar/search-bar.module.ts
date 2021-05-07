import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { SearchBarComponent } from './search-bar.component';

@NgModule({
    imports: [
        CommonModule,
        MatToolbarModule,
        MatInputModule,
        MatFormFieldModule
    ],
    declarations: [
        SearchBarComponent
    ],
    exports: [
        SearchBarComponent
    ]
})
export class SearchBarModule{}