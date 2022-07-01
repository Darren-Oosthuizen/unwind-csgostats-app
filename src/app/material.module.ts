import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTreeModule } from '@angular/material/tree';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";

@NgModule({
    imports: [
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatSidenavModule,
        MatTableModule,
        MatRadioModule,
        MatButtonToggleModule,
        MatMenuModule,
        MatListModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatToolbarModule,
        MatDialogModule,
        MatSlideToggleModule,
        MatStepperModule,
        MatSnackBarModule,
        MatCheckboxModule,
        MatMomentDateModule,
        MatDatepickerModule,
        MatTreeModule,
        MatChipsModule,
        MatProgressBarModule,
        MatTabsModule,
        MatTooltipModule,
        MatExpansionModule
    ],
    exports: [
        MatButtonModule,
        MatTreeModule,
        MatTabsModule,
        MatIconModule,
        MatInputModule,
        MatSidenavModule,
        MatTableModule,
        MatMenuModule,
        MatListModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatMomentDateModule,
        MatButtonToggleModule,
        MatCardModule,
        MatToolbarModule,
        MatDialogModule,
        MatSlideToggleModule,
        MatCheckboxModule,
        MatStepperModule,
        MatSnackBarModule,
        MatChipsModule,
        MatProgressBarModule,
        MatDatepickerModule,
        MatTooltipModule,
        MatExpansionModule,
        MatPaginatorModule,
        MatSortModule
    ],
    providers: [
        { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
        { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } }
    ]
})
export class MaterialModule {}
