import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatGridListModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatTableModule,
  MatToolbarModule,
  MatTooltipModule,
  MatIconModule,
  MatSidenavModule,
  MatTabsModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

library.add(fas);

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDividerModule,
    MatGridListModule,
    MatMenuModule,
    MatSelectModule,
    MatTableModule,
    MatTooltipModule,
    MatIconModule,
    MatSidenavModule,
    MatDialogModule,
    FlexLayoutModule,
    FontAwesomeModule,
    MatTabsModule
  ],
  exports: [
    MatProgressSpinnerModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDividerModule,
    MatGridListModule,
    MatMenuModule,
    MatSelectModule,
    MatTableModule,
    MatTooltipModule,
    MatIconModule,
    MatSidenavModule,
    MatDialogModule,
    FlexLayoutModule,
    FontAwesomeModule,
    MatTabsModule
  ],
  declarations: [],
  providers: []
})
export class MaterialModule {}
