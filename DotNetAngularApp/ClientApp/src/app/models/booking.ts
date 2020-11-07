export interface KeyValuePair {
    id: string;
    name: string;
}

export interface Booking {
    id: number;
    room: { id: number; name: string; capacity: number; };
    building: { id: number; name: string; };
    bookDate: string;
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

export interface SaveBooking {
    id: number;
    roomId: number;
    buildingId: number;
    bookDate: string;
    timeSlots: number[];
    modules: number[];
    semesterId: number;
}