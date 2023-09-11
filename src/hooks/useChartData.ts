import {getChartData} from 'apis/chart';
import {useEffect, useState} from 'react';
import {dataResponseTypes} from 'types/chart';

const useChartData = () => {
    const [data, setData] = useState<dataResponseTypes>({});
    useEffect(() => {
        const getData = async () => {
            const data = await getChartData();
            setData(data.response);
        };
        getData();
    }, []);

    const timeList = Object.keys(data).map(time => time.split(' ')[1]);

    const idList = Object.values(data).map(entry => entry.id);

    const barList = Object.values(data).map(entry => entry.value_bar);

    const areaList = Object.values(data).map(entry => entry.value_area);

    return {timeList, idList, barList, areaList};
};

export default useChartData;
