export interface Lecturer {
    id: number;
    name: string;
    title: string;
    lecturerNameAndTitle: string;
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