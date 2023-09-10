import {getChartData} from 'apis/chart';
import {useEffect, useState} from 'react';
import {chartDataTypes} from 'types/chart';

const useChartData = () => {
    const [data, setData] = useState<chartDataTypes['response']>();
    useEffect(() => {
        getChartData().then(data => {
            setData(data.response);
        });
    }, []);
    const timeList = data ? Object.keys(data).map(time => time.split(' ')[1]) : [];

    const idList = data ? Object.values(data).map(entry => entry.id) : [];

    const barList = data ? Object.values(data).map(entry => entry.value_bar) : [];

    const areaList = data ? Object.values(data).map(entry => entry.value_area) : [];
    return {timeList, idList, barList, areaList};
};

export default useChartData;
