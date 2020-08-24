export interface KeyValuePair {
    id: string;
    name: string;
}

export interface Booking { // like BookingResource form the server
    id: number;
    room: { id: number; name: string; capacity: number; };
    building: { id: number; name: string; };
    bookDate: string;
    modules: { id: number, name: string, code: string }[];
    lecturers: { id: number, name: string, title: string }[];
    timeSlots: { id: number; startTime: string; endTime: string; }[];
}

export interface SaveBooking {
    id: number;
    roomId: number;
    buildingId: number;
    bookDate: string;
    modules: number[];
    lecturers: number[];
    timeSlots: number[];
}