import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdTablePagination } from './table-pagination.component';

@NgModule({
  imports: [CommonModule, FormsModule, NgbModule],
  declarations: [NgbdTablePagination],
  exports: [NgbdTablePagination],
  bootstrap: [NgbdTablePagination]
})
export class NgbdTablePaginationModule {}
