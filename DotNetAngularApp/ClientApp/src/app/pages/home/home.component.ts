import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { BuildingService } from '../../services/building.service';
import {
  CalendarEvent,
  CalendarEventTitleFormatter,
  CalendarView,
  DAYS_OF_WEEK
} from 'angular-calendar';
import { CustomEventTitleFormatter } from './custom-event-title-formatter.provider';
import { Subject } from 'rxjs';
import { 
  isSameDay,
  isSameMonth,
} from 'date-fns';
import { colors } from '../../@theme/components/calendar-header/colors';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'ngx-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter,
    },
  ],
})
export class HomeComponent {
  booking: any;
  buildings: any;
  hasAccess = true;
  detailsAlert: boolean = true;

  excludeDays: number[] = [0, 5];
  weekStartsOn = DAYS_OF_WEEK.MONDAY;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  activeDayIsOpen: boolean = false;
  date: string;
  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];
  bookings: any;
  startDateTime: any;
  endDateTime: any;
  bookDate: any;
  startTime: any;
  endTime: any;
  rooms: any;
  filter: any = {};
  allBookings: any;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private toasty: ToastyService,
    private bookingService: BookingService,
    private buildingService: BuildingService,
    private userService: UserService
    ) {}

  async ngOnInit() {
    if (localStorage.getItem('token') != null) {
      this.hasAccess = this.userService.hasAccess();
    }
    
    this.buildingService.getAllBuildings() // get the buildings from service for filter drop down
      .subscribe(buildings => this.buildings = buildings); // and store in this.buildings

    this.bookings = this.allBookings = await this.bookingService.getAllBookings() // using Promise instead
    this.populateCalendar(); // show all events on init
    this.refresh.next(); // refresh calendar after loading
  }

  // * this will need to be considered when changing the filter/search
  // * reset the current calendar if changing to other searching type (eg. by modules)
  onFilterChange() { // anytime the filters are changed
    this.activeDayIsOpen = false;
    this.events = []; // reset events after every filter change
    var bookings = this.allBookings;

    if (this.filter.buildingId)
      bookings = bookings.filter(b => b.building.id == this.filter.buildingId);

    if (this.filter.roomId)
      bookings = bookings.filter(b => b.room.id == this.filter.roomId);

    this.bookings = bookings;
    this.populateCalendar();
  }

  resetFilter() {
    this.filter = {}; // empty filter drop down
    this.rooms = []; // clear room drop down filter
    this.emptyRoomFilter();
    this.showAllBookings(); // show all if reset
  }

  onBuildingChange() { // for cascading
    var selectedBuilding = this.buildings.find(b => b.id == this.filter.buildingId);
    this.rooms = selectedBuilding ? selectedBuilding.rooms : []; // cascade rooms drop down
    this.emptyRoomFilter();
    
    var bookings = this.allBookings;;
    this.bookings = bookings.filter(b => b.building.id == this.filter.buildingId); // filter events by building
    this.populateCalendar();
  }

  emptyRoomFilter() {
    this.activeDayIsOpen = false;
    this.events = []; // clear events
    delete this.filter.roomId; // clear selected roomId
    this.refresh.next();// refresh calendar after loading
  }

  showAllBookings() {
    this.bookings = this.allBookings;
    this.populateCalendar();
  }

  private populateCalendar() {
    for (let b of this.bookings) {
      var dateFormat = require('dateformat');
      this.bookDate = dateFormat(b.bookDate, 'yyyy-mm-dd'); // * format date

      var modulesLength = b.modules.length;
      var modules: string = b.modules[0].code;
      for (var i=1; i<modulesLength; i++) {
        modules += ", " + b.modules[i].code;
      }

      for (let timeSlot of b.timeSlots) { // * nested loop for each time slots under each booking
        var timeFormat = require('dateformat');
        this.startTime = timeFormat(timeSlot.startTime, 'HH:MM:ss');
        this.startDateTime = this.bookDate + "T" + this.startTime; // * concat date and time into string
        this.endTime = timeFormat(timeSlot.endTime, 'HH:MM:ss');
        this.endDateTime = this.bookDate + "T" + this.endTime;

        this.events = [ // push object into events[]
          ...this.events,
          {
            start: new Date(this.startDateTime),
            end: new Date(this.endDateTime),
            title: ` <b>Module:</b> ${ modules } | <b>Room:</b> ${ b.building.name } - ${ b.room.name }`,
            color: colors.teal,
            meta: {
              id: b.id, // * just the id for component call
              // b, // * the whole booking object
            },
          },
        ];
      }
    }
    this.refresh.next();
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  onClick() {
    this.detailsAlert = false;
  }

  // ! need to click the event twice to show details. Why?
  
  // @Output() sendBookingId = new EventEmitter<number>();
  
  // send Id to home component for booking-details to use
  eventClicked({ event }: { event: CalendarEvent }): void {
    // this.sendBookingId.emit(event.meta.id); // * gets the bookingId when event is clicked
    this.bookingService.getBooking(event.meta.id)
      .subscribe(b => this.booking = b);
  }

  // receiveBookingId($event) {
  //   this.bookingService.getBooking($event)
  //     .subscribe(b => this.booking = b);
  // }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() { // for calendar-header.. click next to close slide animation
    this.activeDayIsOpen = false;
  }

  changeDay(date: Date) {
    this.viewDate = date;
    this.view = CalendarView.Day;
  }

  delete() {
    if (confirm("Are you sure?")) {
      this.bookingService.delete(this.booking.id)
        .subscribe(x => {
          // this.router.navigate(['/pages/bookings']);
          this.redirectTo('/pages/bookings');
        });
    }
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }
}
