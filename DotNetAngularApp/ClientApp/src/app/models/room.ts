export interface Room { // from resource
    id: number;
    name: string;
    capacity: number;
    building: { id: number; name: string; };
}

export interface SaveRoom {
    id: number;
    name: string;
    capacity: number;
    buildingId: number;
}