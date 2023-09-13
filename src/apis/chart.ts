import {chartDataTypes} from 'types/chart';
import {httpClient} from './instance';

const DB_JSON_PATH = 'data/mock.json';

export const getChartData = async () => {
    try {
        const response = await httpClient.get<chartDataTypes>(DB_JSON_PATH);
        return response.data;
    } catch (error) {
        console.error('fetchingError:', error);
        throw error;
    }
};
