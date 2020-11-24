export interface KeyValuePair {
  id: string;
  name: string;
}

export interface Booking {
  id: number;
  offerings: {
    id: number;
    semesterId: number;
    module: {
      id: number;
      name: string;
      code: string;
      major: {
        id: number;
        facultyId: number;
        name: string;
        shortName: string;
        // modules: any[];
      }
    };
    // lecturers: any[];
  }[];
  bookDates: {
    date: string
  }[];
  rooms: {
    id: number;
    name: string;
    code: string;
    capacity: number;
    building: {
      id: number;
      name: string;
    };
  }[];
  timeSlots: {
    id: number;
    startTime: string;
    endTime: string;
  }[];
  purpose: string;
}

export interface SaveBooking {
  id: number;
  offerings: number[];
  rooms: number[];
  timeSlots: number[];
  bookDates: string[];
  purpose: string;
  buildingId: number; // redundant?
}
