import { OfferingService } from './../../services/offering.service';
import { LecturerService } from './../../services/lecturer.service';
import { FacultyService } from './../../services/faculty.service';
import { Component } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { BuildingService } from '../../services/building.service';
import { CalendarEvent, CalendarEventTitleFormatter, CalendarView, DAYS_OF_WEEK } from 'angular-calendar';
import { CustomEventTitleFormatter } from './custom-event-title-formatter.provider';
import { Observable, Subject } from 'rxjs';
import { isSameDay, isSameMonth } from 'date-fns';
import { colors } from '../../@theme/components/calendar-header/colors';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'ngx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [{
    provide: CalendarEventTitleFormatter,
    useClass: CustomEventTitleFormatter,
  }, ],
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
  allOfferings: any;
  allBookings: any;
  bookings: any; // events to be populated on calendar
  booking: any; // a single booking event

  excludeDays: number[] = [0, 5];
  weekStartsOn = DAYS_OF_WEEK.MONDAY;
  view: CalendarView = CalendarView.Week;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  activeDayIsOpen: boolean = false;
  date: string;
  refresh: Subject < any > = new Subject();
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
    private facultyService: FacultyService,
    private lecturerService: LecturerService,
    private offeringService: OfferingService
  ) {}

  ngOnInit() {
    if (localStorage.getItem('token') != null)
      this.hasAccess = this.userService.hasAccess();

    Observable.forkJoin([
      this.facultyService.getAllFaculties(),
      this.buildingService.getAllBuildings(),
      this.lecturerService.getAllLecturers(),
      this.offeringService.getAllOfferings(),
      this.bookingService.getAllBookings()
    ]).subscribe(data => {
      this.faculties = data[0];
      this.buildings = data[1];
      this.lecturers = data[2];
      this.allOfferings = data[3];
      this.bookings = this.allBookings = data[4];

      this.populateCalendar();
      this.refresh.next();
    }, error => console.log(error));
  }

  // * Filter by modules ---------------------------------------------------------------

  onFacultyChange() {
    this.populateMajorsDropdown();
    this.resetCalendar();
    delete this.filter.majorId;
    this.filterBookingsByFacultyId();
    this.populateCalendar();
  }

  private filterBookingsByFacultyId() {
    var bookings = this.allBookings;
    this.bookings = bookings.filter(b => b.offerings.find(o => o.module.major.facultyId == this.filter.facultyId));
  }

  private populateMajorsDropdown() {
    var selectedFaculty = this.faculties.find(faculty => faculty.id == this.filter.facultyId);
    this.majors = selectedFaculty ? selectedFaculty.majors : [];
  }

  onMajorChange() {
    var selectedMajor = this.majors.find(major => major.id == this.filter.majorId);
    this.modules = selectedMajor ? selectedMajor.modules : [];
    this.resetCalendar();
    delete this.filter.moduleId;

    var bookings = this.allBookings;
    this.bookings = bookings.filter(b => b.offerings.find(o => o.module.major.id == this.filter.majorId));
    this.populateCalendar();
  }

  onModuleFilterChange() {
    this.resetCalendar();
    var bookings = this.allBookings;

    if (this.filter.moduleId)
      this.bookings = bookings.filter(b => b.offerings.find(o => o.module.id == this.filter.moduleId));

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
    var selectedBuilding = this.buildings.find(b => b.id == this.filter.buildingId);
    this.rooms = selectedBuilding ? selectedBuilding.rooms : [];
    delete this.filter.rooms;
    this.resetCalendar();
    this.filterBookingsByBuildingId();
    this.populateCalendar();
  }

  private filterBookingsByBuildingId() {
    var bookings = this.allBookings;
    this.bookings = bookings.filter(b => b.rooms.find(r => r.building.id == this.filter.buildingId));
  }

  onRoomChange() {
    this.resetCalendar();
    this.bookings = this.filterBookingsBySelectedRooms();
    this.populateCalendar();
  }

  private filterBookingsBySelectedRooms() {
    var bookings = this.allBookings;
    if (this.filter.rooms)
      bookings = bookings.filter(b => b.rooms.find(r => r.id == this.filter.rooms));
    return bookings;
  }

  resetRoomFilter() {
    this.filter = {};
    this.rooms = [];
    delete this.filter.rooms;
    this.resetCalendar();
    this.showAllBookings();
  }

  // * Filter by lecturers ---------------------------------------------------------------

  onLecturerChange() {
    this.resetCalendar();
    var offerings = this.allOfferings;

    if (this.filter.lecturerId) {
      var offeringIds = this.mapOfferingIdsFromOfferings(offerings);
      offeringIds.forEach(offeringId => {
        this.filterBookingsByOfferingId(offeringId);
        this.populateCalendar();
      });
    }
  }

  private mapOfferingIdsFromOfferings(offerings: any) {
    return offerings
      .filter(offering => offering.lecturers
        .find(l => l.id == this.filter.lecturerId))
      .map(offering => offering.id);
  }

  private filterBookingsByOfferingId(offeringId: any) {
    this.bookings = this.allBookings
      .filter(b => b.offerings
        .find(bo => bo.id == offeringId));
  }

  resetLecturerFilter() {
    this.filter = {};
    delete this.filter.lecturers;
    this.resetCalendar();
    this.showAllBookings();
  }

  showAllBookings() {
    this.bookings = this.allBookings;
    this.populateCalendar();
  }

  private populateCalendar() {
    for (let b of this.bookings) {      
      var lecturerArray: any = this.convertLecturerSetToArray(b);
      var lecturers: string = this.bookingLecturers(lecturerArray);
      var modules: string = this.bookingModules(b);
      var rooms: string = this.bookingRooms(b);
      var purpose: string = this.bookingPurpose(b);

      for (let bd of b.bookDates) {
        var bookDate = this.formatBookDateToDisplayOnTimetable(bd);
        for (let timeSlot of b.timeSlots) {
          this.formatTimeToDisplayOnTimetable(timeSlot, bookDate);
          this.events = [
            ...this.events, {
              start: new Date(this.startDateTime),
              end: new Date(this.endDateTime),
              title: `<b>${ modules } ${ purpose }</b><br>${ rooms }<br>${ lecturers }`,
              color: colors.teal,
              meta: { id: b.id },
            },
          ];
        }
      }
    }
    this.refresh.next();
  }

  private convertLecturerSetToArray(b: any) {
    var moduleLecturers = this.getUniqueLecturersFromOfferings(b);
    var lecturerArray: any = Array.from(moduleLecturers);
    return lecturerArray;
  }

  private getUniqueLecturersFromOfferings(b: any) {
    var moduleLecturers = new Set();
    var offering: any;
    var offeringIds: number[] = b.offerings.map(offering => offering.id);
    for (let id of offeringIds) {
      offering = this.allOfferings.find(o => o.id == id);
      for (let lecturer of offering.lecturers)
        moduleLecturers.add(lecturer);
    }
    return moduleLecturers;
  }

  private bookingLecturers(lecturerArray: any) {
    var lecturers: string = `${lecturerArray[0].name} (${lecturerArray[0].title})`;
    if (lecturerArray.length > 1)
      lecturers = this.appendLecturers(lecturerArray, lecturers);
    return lecturers;
  }

  private appendLecturers(lecturerArray: any, lecturers: string) {
    for (var i = 1; i < lecturerArray.length; i++)
      lecturers += `, ${lecturerArray[i].name} (${lecturerArray[i].title})`;
    return lecturers;
  }

  private bookingModules(b: any) {
    var modules: string = `${b.offerings[0].module.code}: ${b.offerings[0].module.name}`;
    if (b.offerings.length > 1)
      modules = this.appendModules(b, modules);
    return modules;
  }

  private appendModules(b: any, modules: string) {
    for (var i = 1; i < b.offerings.length; i++)
      modules += `, ${b.offerings[i].module.code}: ${b.offerings[i].module.name}`;
    return modules;
  }

  private bookingRooms(b: any) {
    var rooms: string = `${b.rooms[0].name}`;
    if (b.rooms.length > 1)
      rooms = this.appendRooms(b, rooms);
    return rooms;
  }

  private appendRooms(b: any, rooms: string) {
    for (var i = 1; i < b.rooms.length; i++)
      rooms += `, ${b.rooms[i].name}`;
    return rooms;
  }

  private bookingPurpose(b: any) {
    var purpose: string;
    if (b.purpose != '')
      return purpose = `(${b.purpose})`;
    else
      return purpose = '';
  }

  private formatBookDateToDisplayOnTimetable(bd: any) {
    var dateFormat = require('dateformat');
    var bookDate = dateFormat(bd.date, 'yyyy-mm-dd');
    return bookDate;
  }

  private formatTimeToDisplayOnTimetable(timeSlot: any, bookDate: any) {
    var timeFormat = require('dateformat');
    this.startTime = timeFormat(timeSlot.startTime, 'HH:MM:ss');
    this.startDateTime = bookDate + "T" + this.startTime;
    this.endTime = timeFormat(timeSlot.endTime, 'HH:MM:ss');
    this.endDateTime = bookDate + "T" + this.endTime;
  }

  refreshCalendar() {
    window.location.reload();
  }

  dayClicked({date, events}: {date: Date; events: CalendarEvent[]}): void {
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

  eventClicked({event}: {event: CalendarEvent}): void {
    this.bookingService.getBooking(event.meta.id)
      .subscribe(b => this.booking = b);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
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
          window.location.reload();
          this.warningToasty('Success', 'Booking event was successfully deleted')
        });
    }
  }

  warningToasty(title: string, message: string) {
    this.toasty.warning({
      title: title, 
      msg: message,
      theme: 'bootstrap',
      showClose: true,
      timeout: 3000
    });
  }

  onCloseDetailsAlert() {
    this.detailsAlert = false;
  }

  onCloseBookingDetails() {
    this.booking = null;
  }

  onCloseSuccessAlert() {
    this.successAlert = false;
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', {
      skipLocationChange: true
    }).then(() =>
      this.router.navigate([uri]));
  }
}
