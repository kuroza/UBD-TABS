import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'angular-calendar';
import { CalendarHeaderComponent } from './calendar-header.component';
import { NbButtonModule, NbIconModule, NbTooltipModule } from '@nebular/theme';

@NgModule({
  imports: [NbTooltipModule, NbIconModule, NbButtonModule, CommonModule, FormsModule, CalendarModule],
  declarations: [CalendarHeaderComponent],
  exports: [CalendarHeaderComponent],
})
export class CalendarHeaderModule {}