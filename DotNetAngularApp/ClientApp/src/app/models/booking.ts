export interface KeyValuePair {
  id: string;
  name: string;
}

export interface Booking {
  id: number;
  semesterId: number;
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
  modules: {
    id: number;
    name: string;
    code: string;
    lecturers: {
      id: number;
      name: string;
      title: string;
    }[];
  }[];
  purpose: string;
}

export interface SaveBooking {
  id: number;
  semesterId: number;
  buildingId: number;
  rooms: number[];
  timeSlots: number[];
  modules: number[];
  bookDates: string[];
  purpose: string;
}
