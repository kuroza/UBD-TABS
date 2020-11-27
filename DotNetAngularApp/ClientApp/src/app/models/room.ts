export interface Room {
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