
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateCompiler, TranslateLoader, TranslateModule, TranslateParser } from '@ngx-translate/core';
import { DataTablesModule } from 'angular-datatables';
import { MultiSelectComponent } from '../baseView/inputs/multi-select/multi-select.component';
import { DataTablesComponent } from '../baseView/tables/tables.component';
import {TableModule} from 'primeng/table';
import { HttpLoaderFactory } from '../../app.module';
import { HttpClient } from '@angular/common/http';
import { NgxBarcodeModule } from 'ngx-barcode';
import { ModalComponent } from '../baseView/modal/modal.component';
import { PermissionsDirective } from '../../base/permissions.directive';





// Components Routing


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DataTablesModule,
    TableModule,
    TranslateModule,
    NgxBarcodeModule


  ],
  declarations: [

    DataTablesComponent,
    MultiSelectComponent,
    ModalComponent,
    PermissionsDirective







  ],
  exports:[

    DataTablesComponent,
    MultiSelectComponent,
    TranslateModule,
    NgxBarcodeModule,
    ModalComponent,
    PermissionsDirective

  ]
})
export class SharedModule {


}

