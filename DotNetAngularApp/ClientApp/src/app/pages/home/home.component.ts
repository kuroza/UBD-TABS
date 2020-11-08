import { SemesterService } from './../../services/semester.service';
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
  hasAccess = true;
  detailsAlert: boolean = true;
  nbSpinner: boolean = false;

  semesters: any;
  buildings: any;
  rooms: any;
  filter: any = {};
  allBookings: any;
  booking: any; // a single booking event
  bookings: any; // events to be populated on calendar

  excludeDays: number[] = [0, 5];
  weekStartsOn = DAYS_OF_WEEK.MONDAY;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  activeDayIsOpen: boolean = false;
  date: string;
  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];
  startDateTime: any;
  endDateTime: any;
  bookDate: any;
  startTime: any;
  endTime: any;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private toasty: ToastyService,
    private bookingService: BookingService,
    private buildingService: BuildingService,
    private userService: UserService,
    private semesterService: SemesterService
    ) {}

  async ngOnInit() {
    if (localStorage.getItem('token') != null) {
      this.hasAccess = this.userService.hasAccess();
    }
    
    this.semesterService.getAllSemesters()
      .subscribe(semesters => this.semesters = semesters);

    this.buildingService.getAllBuildings() // get the buildings from service for filter drop down
      .subscribe(buildings => this.buildings = buildings); // and store in this.buildings

    this.bookings = this.allBookings = await this.bookingService.getAllBookings() // using Promise instead
    this.populateCalendar(); // show all events on init
    this.refresh.next(); // refresh calendar after loading
  }

  onFilterChange() { // anytime the filters are changed
    this.activeDayIsOpen = false;
    this.events = []; // reset events after every filter change
    var bookings = this.allBookings; // show all Bookings

    /*
      todo: show bookings from the selected Semester
      ! initially a Semester is already selected?
      else, no Bookings are displayed
    */
    if (this.filter.semesterId)
      bookings = bookings.filter(b => b.semester.id == this.filter.semesterId);

    if (this.filter.buildingId) // [(selected)]="filter.buildingId"
      // show bookings from the selected Building
      bookings = bookings.filter(b => b.building.id == this.filter.buildingId);

    if (this.filter.roomId)
      // show bookings from the selected Room
      bookings = bookings.filter(b => b.room.id == this.filter.roomId);

    this.bookings = bookings;
    this.populateCalendar();
  }

  // onSemesterChange() {
  //   this.events = [];
  //   var bookings = this.allBookings;
  //   this.bookings = bookings.filter(b => b.semester.id == this.filter.semesterId);
  //   this.populateCalendar();
  //   this.refresh.next();
  // }

  onBuildingChange() { // for cascading
    var selectedBuilding = this.buildings.find(b => b.id == this.filter.buildingId);
    this.rooms = selectedBuilding ? selectedBuilding.rooms : []; // cascade rooms drop down
    this.emptyRoomFilter();
    
    var bookings = this.allBookings;
    this.bookings = bookings.filter(b => b.building.id == this.filter.buildingId); // filter events by building
    this.populateCalendar(); // ! am I repeating this with onFilterChange()? Maybe not..
  }

  emptyRoomFilter() {
    this.activeDayIsOpen = false;
    this.events = []; // clear events
    delete this.filter.roomId; // clear selected roomId
    this.refresh.next(); // refresh calendar after loading
  }

  showAllBookings() {
    this.bookings = this.allBookings;
    this.populateCalendar();
  }

  resetFilter() {
    this.filter = {}; // empty filter drop down
    this.rooms = []; // clear room dropdown
    this.emptyRoomFilter();
    this.showAllBookings(); // show all if reset
  }

  private populateCalendar() {
    this.nbSpinner = true;

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
    this.nbSpinner = false;
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
  
  eventClicked({ event }: { event: CalendarEvent }): void {
    this.bookingService.getBooking(event.meta.id)
      .subscribe(b => this.booking = b);
  }

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
          this.redirectTo('/pages/bookings');
        });
    }
  }

  onCloseDetails() {
    this.detailsAlert = false;
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }
}
