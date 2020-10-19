export interface Lecturer { // from resource
    id: number;
    name: string;
    title: string;
    modules: {
        id: number;
        name: string;
        code: string;
    }[];
}

export interface SaveLecturer {
    id: number;
    name: string;
    title: string;
}