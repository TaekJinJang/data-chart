import ApexCharts from 'react-apexcharts';
import useChartData from 'hooks/useChartData';
import Filter from './Filter';
import useQuerystring from 'hooks/useQueryString';
import * as options from 'components/chart/Options';
import CustomTooltip from 'components/chart/CustomTooltip';
import {dataPointType} from 'types/chart';
import styled from 'styled-components';

const Chart = () => {
    const {timeList, idList, barList, areaList} = useChartData();
    const {queries, addQuery, deleteQuery} = useQuerystring();

    const series = [
        // 차트 데이터 시리즈
        {
            name: 'Area',
            type: 'area',
            data: areaList,
        },
        {
            name: 'Bar',
            type: 'bar',
            data: barList,
        },
    ];

    const chartOptions = {
        noData: options.getNoDataOption(),
        legend: options.getLegendOption(),
        chart: options.getChartEventsOption({idList, queries, addQuery, deleteQuery}),
        colors: options.getColorsOption({idList, queries}),
        fill: options.getFillOption(),
        stroke: options.getStrokeOption(),

        yaxis: options.getYaxisOption(),

        xaxis: options.getXaxisOption({timeList}),
        annotations: options.getAnnotationsOption({
            idList,
            areaList,
            timeList,
            queries,
        }),

        tooltip: {
            custom: ({dataPointIndex}: dataPointType) =>
                CustomTooltip({
                    dataPointIndex,
                    timeList,
                    barList,
                    areaList,
                    idList,
                    queries,
                }),
        },
    };

    return (
        <Container>
            <Filter />
            <ApexCharts series={series} options={chartOptions} height={600} />
        </Container>
    );
};

export default Chart;

const Container = styled.div`
    width: 1200px;

    background-color: #fff;
    border: 2px solid #000;
`;
