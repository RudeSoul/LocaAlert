export interface Alarm {
	id: string;
	latitude: number;
	longitude: number;
	distance: number;
	days: boolean[];
	specificDate: Date | null;
	active: boolean;
}

export interface LocationCoords {
	latitude: number;
	longitude: number;
}

export type AlarmDays = boolean[];

