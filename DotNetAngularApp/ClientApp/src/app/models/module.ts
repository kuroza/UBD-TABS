export interface Module {
    id: number;
    name: string;
    code: string;
    moduleCodeAndName: string;
    major: {
        id: number;
        name: string;
        shortName: string;
        facultyId: number;
    }
}

export interface SaveModule {
    id: number;
    name: string;
    code: string;
    majorId: number;
}