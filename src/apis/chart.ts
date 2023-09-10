import {instance} from './instance';

const DB_JSON_PATH = 'data/mock.json';

export interface getChartResponse {
    type: string;
    version: number;
    response: {
        [key: string]: {id: string; value_area: number; value_bar: number};
    };
}

export const getChartData = async () => {
    try {
        const response = await instance.get<getChartResponse>(DB_JSON_PATH);
        return response.data;
    } catch (error) {
        console.error('fetchingError:', error);
    }
};
