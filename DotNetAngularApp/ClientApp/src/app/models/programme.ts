export interface SaveProgramme {
    id: number;
    name: string;
    facultyId: number; // !
}

export interface Programme { // from resource
    id: number;
    name: string;
    faculty: { id: number, name: string }
}