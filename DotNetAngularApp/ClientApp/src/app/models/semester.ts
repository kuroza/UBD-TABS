export interface Semester {
    id: number;
    session: string;
    startDate: string;
    endDate: string;
    // bookings: {
    //     id: number;
    //     room: { id: number; name: string; capacity: number; }; // []
    //     building: { id: number; name: string; }; // []
    //     bookDate: string; // []
    //     timeSlots: { id: number; startTime: string; endTime: string; }[];
    //     modules: { 
    //         id: number; 
    //         name: string; 
    //         code: string; 
    //         lecturers: { 
    //             id: number; 
    //             name: string; 
    //             title: string; 
    //         }[]; 
    //     }[];
    // }[];
}

export interface SaveSemester {
    id: number;
    session: string;
    startDate: string;
    endDate: string;
}