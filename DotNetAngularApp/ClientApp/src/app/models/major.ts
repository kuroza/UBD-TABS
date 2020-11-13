export interface SaveMajor {
    id: number;
    name: string;
    facultyId: number; // !
}

export interface Major { // from resource
    id: number;
    name: string;
    faculty: { id: number, name: string }
}