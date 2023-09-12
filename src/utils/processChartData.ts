import {dataResponseTypes} from 'types/chart';

const processChartData = (data: dataResponseTypes) => {
    const timeList = Object.keys(data).map(time => time.split(' ')[1]);
    const idList = Object.values(data).map(entry => entry.id);
    const barList = Object.values(data).map(entry => entry.value_bar);
    const areaList = Object.values(data).map(entry => entry.value_area);

    return {timeList, idList, barList, areaList};
};

export default processChartData;
