export interface chartDataTypes {
    type: string;
    version: number;
    response: dataResponseTypes;
}

export interface dataResponseTypes {
    [key: string]: {id: string; value_area: number; value_bar: number};
}

export interface dataPointType {
    dataPointIndex: number;
}
