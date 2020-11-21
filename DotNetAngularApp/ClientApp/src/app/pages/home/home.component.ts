import { LecturerService } from './../../services/lecturer.service';
import { ModuleService } from './../../services/module.service';
import { FacultyService } from './../../services/faculty.service';
import { MajorService } from '../../services/major.service';
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
  successAlert: boolean = false;
  nbSpinner: boolean = false;

  faculties: any;
  majors: any;
  modules: any;
  semesters: any;
  buildings: any;
  lecturers: any;
  rooms: any = [];
  filter: any = {};
  allBookings: any;
  booking: any; // a single booking event
  bookings: any; // events to be populated on calendar

  excludeDays: number[] = [0, 5];
  weekStartsOn = DAYS_OF_WEEK.MONDAY;
  view: CalendarView = CalendarView.Week;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  activeDayIsOpen: boolean = false;
  date: string;
  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];
  startDateTime: any;
  endDateTime: any;
  startTime: any;
  endTime: any;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private toasty: ToastyService,
    private bookingService: BookingService,
    private buildingService: BuildingService,
    private userService: UserService,
    private semesterService: SemesterService,
    private majorService: MajorService,
    private facultyService: FacultyService,
    private moduleService: ModuleService,
    private lecturerService: LecturerService
    ) {}

  async ngOnInit() {
    if (localStorage.getItem('token') != null) {
      this.hasAccess = this.userService.hasAccess();
    }

    this.facultyService.getAllFaculties()
      .subscribe(faculties => this.faculties = faculties);
      
    this.buildingService.getAllBuildings() // get the buildings from service for filter drop down
      .subscribe(buildings => this.buildings = buildings); // and store in this.buildings

    this.lecturerService.getAllLecturers()
      .subscribe(lecturers => this.lecturers = lecturers);

    this.bookings = this.allBookings = await this.bookingService.getAllBookings() // using Promise instead
    this.populateCalendar(); // show all events on init
    this.refresh.next(); // refresh calendar after loading
  }

  // * Filter by modules ---------------------------------------------------------------

  onFacultyChange() {
    var selectedFaculty = this.faculties.find(faculty => faculty.id == this.filter.facultyId);
    this.majors = selectedFaculty ? selectedFaculty.majors : [];
    this.resetCalendar();
    delete this.filter.majorId;

    var bookings = this.allBookings;
    this.bookings = bookings.filter(b => b.modules.find(module => module.major.facultyId == this.filter.facultyId));
    this.populateCalendar();
  }

  onMajorChange() {
    var selectedMajor = this.majors.find(major => major.id == this.filter.majorId);
    this.modules = selectedMajor ? selectedMajor.modules : [];
    this.resetCalendar();
    delete this.filter.moduleId;

    var bookings = this.allBookings;
    this.bookings = bookings.filter(b => b.modules.find(module => module.major.id == this.filter.majorId));
    this.populateCalendar();
  }

  onModuleFilterChange() {
    this.resetCalendar();
    var bookings = this.allBookings;

    if (this.filter.moduleId)
      this.bookings = bookings.filter(b => b.modules.find(module => module.id == this.filter.moduleId));

    this.populateCalendar();
  }

  resetCalendar() {
    this.activeDayIsOpen = false;
    this.events = [];
    this.refresh.next();
  }

  resetModuleFilter() {
    this.filter = {};
    this.majors = [];
    this.modules = [];
    this.resetCalendar();
    this.showAllBookings();
  }

  // * Filter by rooms ---------------------------------------------------------------

  onBuildingChange() {
    // cascade rooms drop down
    var selectedBuilding = this.buildings.find(b => b.id == this.filter.buildingId);
    this.rooms = selectedBuilding ? selectedBuilding.rooms : [];
    this.resetCalendar();
    delete this.filter.rooms;
    
    // filter events by building
    var bookings = this.allBookings;
    this.bookings = bookings.filter(b => b.rooms.find(r => r.building.id == this.filter.buildingId));
    this.populateCalendar();
  }

  onRoomChange() {
    this.resetCalendar();
    var bookings = this.allBookings;

    if (this.filter.rooms)
      // show bookings from the selected Room
      bookings = bookings.filter(b => b.rooms.find(r => r.id == this.filter.rooms));

    this.bookings = bookings;
    this.populateCalendar();
  }

  resetRoomFilter() {
    this.filter = {}; // empty filter drop down
    this.rooms = []; // clear room dropdown
    delete this.filter.rooms; // ? clear selected rooms
    this.resetCalendar();
    this.showAllBookings(); // show all if reset
  }

  // * Filter by lecturers ---------------------------------------------------------------

  onLecturerChange() {
    this.resetCalendar();
    var bookings = this.allBookings;

    if (this.filter.lecturerId)
      bookings = bookings.filter(b => b.modules.find(module => module.lecturers.find(lecturer => lecturer.id == this.filter.lecturerId)));

    this.bookings = bookings;
    this.populateCalendar();
  }

  resetLecturerFilter() {
    this.filter = {};
    this.lecturers = [];
    delete this.filter.lecturers;
    this.resetCalendar();
    this.showAllBookings();
  }

  showAllBookings() {
    this.bookings = this.allBookings;
    this.populateCalendar();
  }

  private populateCalendar() {
    this.nbSpinner = true;

    for (let b of this.bookings) {
      for (let bd of b.bookDates) {
        var dateFormat = require('dateformat');
        var bookDate = dateFormat(bd.date, 'yyyy-mm-dd'); // * format date

        // * Iterate Modules and Lecturers
        var modules: string = `${b.modules[0].code}: ${b.modules[0].name}`;
        var lecturers: string = `${b.modules[0].lecturers[0].name} (${b.modules[0].lecturers[0].title})`;
        if (b.modules[0].lecturers.length > 1) {
          for (var i=1; i<b.modules[0].lecturers.length; i++)
            lecturers += `, ${b.modules[0].lecturers[i].name} (${b.modules[0].lecturers[i].title})`;
        }
        if (b.modules.length > 1) {
          for (var i=1; i<b.modules.length; i++) {
            modules += `, ${b.modules[i].code}: ${b.modules[i].name}`;
            for (var j=0; j<b.modules[i].lecturers.length; j++)
              lecturers += `, ${b.modules[i].lecturers[j].name} (${b.modules[i].lecturers[j].title})`;
          }
        }
        
        // * Iterate Rooms
        var rooms: string = `${b.rooms[0].name}`;
        if (b.rooms.length > 1) {
          for (var i=1; i<b.rooms.length; i++)
            rooms += `, ${b.rooms[i].name}`;
        }

        var purpose: string;
        if (b.purpose != '')
          purpose = `(${b.purpose})`;
        else
          purpose = '';

        // * nested loop for each time slots under each booking
        for (let timeSlot of b.timeSlots) {
          var timeFormat = require('dateformat');
          this.startTime = timeFormat(timeSlot.startTime, 'HH:MM:ss');
          this.startDateTime = bookDate + "T" + this.startTime;
          this.endTime = timeFormat(timeSlot.endTime, 'HH:MM:ss');
          this.endDateTime = bookDate + "T" + this.endTime;

          // * push object into events[]
          this.events = [
            ...this.events,
            {
              start: new Date(this.startDateTime),
              end: new Date(this.endDateTime),
              title: `<b>${ modules } ${ purpose }</b><br>${ rooms }<br>${ lecturers }`,
              color: colors.teal,
              meta: {
                id: b.id,
              },
            },
          ];
        }
      }
    }
    this.nbSpinner = false;
    this.refresh.next();
  }

  refreshCalendar() {
    // this.resetCalendar();
    // this.resetLecturerFilter();
    // this.resetModuleFilter();
    // this.resetRoomFilter();
    window.location.reload();
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
          window.location.reload(); // sometimes the page refreshes
        });
    }
  }

  onCloseDetails() {
    this.detailsAlert = false;
  }

  // onSuccessBooking() {
  //   this.successAlert = true;
  //   // setTimeout()
  // }

  onClickClose() {
    this.booking = null;
  }

  onCloseSuccess() {
    this.successAlert = false;
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }
}
