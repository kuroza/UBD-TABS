export interface KeyValuePair {
    id: string;
    name: string;
}

export interface Contact {
    name: string;
    phone: string;
    email: string;
}

export interface Booking { // like BookingResource form the server
    id: number;
    room: { id: number; name: string; capacity: number; };
    building: { id: number; name: string; };
    bookDate: string;
    contact: Contact;
    purpose: string;
    timeSlots: { id: number; startTime: string; endTime: string; }[];
}

export interface SaveBooking {
    id: number;
    roomId: number;
    buildingId: number;
    bookDate: string;
    contact: Contact;
    purpose: string;
    timeSlots: number[];
}