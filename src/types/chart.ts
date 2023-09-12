export interface chartDataTypes {
    type: string;
    version: number;
    response: dataResponseTypes;
}

export interface dataResponseTypes {
    [key: string]: {id: string; value_area: number; value_bar: number};
}

export interface Points {
    x: string;
    y: number;
    label?: {
        text: string;
        borderColor: string;
    };
    seriesIndex?: number;
    marker: {
        size: number;
        strokeColor: string;
    };
}
