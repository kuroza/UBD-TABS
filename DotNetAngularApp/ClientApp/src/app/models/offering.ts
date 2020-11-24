export interface Offering {
  id: number;
  semesterId: number;
  module: {
    id: number;
    name: string;
    code: string;
    major: {
      id: number;
      facultyId: number;
      name: string;
      shortName: string;
      // modules: any[];
    };
  };
  lecturers: {
    id: number;
    name: string;
    title: string;
    email: string;
  };
}

export interface SaveOffering {
  id: number;
  semesterId: number;
  moduleId: number;
  lecturers: number[];
}
