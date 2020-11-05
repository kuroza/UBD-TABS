export interface KeyValuePair {
    id: string;
    name: string;
}

export interface Booking { // from resource
    id: number;
    room: { id: number; name: string; capacity: number; }; // {}[]
    building: { id: number; name: string; }; // {}[]
    bookDate: string; // string[]
    timeSlots: { id: number; startTime: string; endTime: string; }[];
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
    semesters: { id: number; session: string; startDate: string; endDate: string; }[];
}

export interface SaveBooking { // save to database
    id: number;
    roomId: number; // number[]
    buildingId: number; // number[]
    // bookDate: string[];
    bookDate: string;
    timeSlots: number[];
    modules: number[];
    semesterId: number;
}