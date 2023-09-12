import ApexCharts from 'react-apexcharts';
import useChartData from 'hooks/useChartData';
import styled from 'styled-components';
import {ApexOptions} from 'apexcharts';
import {CHART_COLOR} from 'styles/colors';
import Filter from './Filter';
import useQuerystring from 'hooks/useQueryString';
import {Points} from 'types/chart';
import {renderToString} from 'react-dom/server';

interface dataPointType {
    dataPointIndex: number;
}

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

    const filterColors = [
        CHART_COLOR.area,
        ({dataPointIndex}: dataPointType) => {
            const filterData = idList[dataPointIndex];
            return queries.includes(filterData) ? CHART_COLOR.barFilter : CHART_COLOR.bar;
        },
    ];

    const handlePoints = () => {
        const defaultMarker = {
            size: 6,
            strokeColor: CHART_COLOR.areaPoint,
        };

        const defaultLabel = {
            borderColor: CHART_COLOR.areaPoint,
            borderRadius: 10,
        };
        const setOptions = idList.reduce<Points[]>((acc, curId, index) => {
            const option = {
                seriesIndex: 0,
                marker: {...defaultMarker},
                label: {...defaultLabel, text: curId},
                x: timeList[index],
                y: areaList[index],
            };

            if (queries.includes(curId)) acc.push(option);

            return acc;
        }, []);

        return setOptions;
    };

    const chartOptions: ApexOptions = {
        noData: {
            // 데이터가 없을 시
            text: 'Loading...',
            style: {
                fontSize: '40px',
            },
        },
        legend: {
            // 범례
            position: 'bottom', // 배치
            horizontalAlign: 'center', // 수평으로 가운데 정렬
            offsetY: -10, // Y축 오프셋(위치 조정)
            onItemClick: {
                toggleDataSeries: true, // 범례 항목 클릭 시 해당 데이터 시리즈를 토글(보이기/숨기기)
            },
            markers: {
                fillColors: [CHART_COLOR.area, CHART_COLOR.bar], // 범례 마커 색상 설정
            },
        },
        chart: {
            // 차트
            height: 350, // 높이 설정
            type: 'bar', // 차트 타입
            events: {
                click: (event, chart, config) => {
                    const clickData = idList[config.dataPointIndex];
                    queries.includes(clickData) ? deleteQuery(clickData) : addQuery(clickData);
                },
                updated: (chartContext, config) => {
                    // 차트에 시리즈 데이터가 없을 시 모든 주석을 제거
                    const isAreaActive = !!config.config.series[0].data.length;
                    if (!isAreaActive) chartContext.clearAnnotations();
                },
            },
        },
        colors: filterColors,
        fill: {
            opacity: [1, 0.5],
        },
        stroke: {
            width: [3, 0], //(선 그래프에서 선 또는 테두리 너비)
            curve: 'smooth', //(선 그래프에서 곡선 유형)
        },

        yaxis: [
            // y축
            {
                seriesName: 'area', //데이터 시리즈 이름
                min: 0, // 최소값
                max: 200, // 최대값
                tickAmount: 4, // 표시할 눈금 개수
                axisTicks: {
                    show: true, // 축 라벨과 격자 선 사이의 작은 축 지점 표시 여부
                },
                axisBorder: {
                    show: true, // Y축 좌우 경계 선 보여줄지 여부
                },
                title: {
                    text: 'Area', // 제목
                },
                tooltip: {
                    enabled: true, // 툴팁 사용 여부
                },
            },

            {
                opposite: true, // 오른쪽 Y축 사용 여부
                seriesName: 'bar', // 오른쪽 Y축인 경우 해당 데이터 시리즈 이름
                axisTicks: {show: true}, // 오른쪽 Y축 라벨과 격자 선 사이의 작은 축 지점 표시 여부
                axisBorder: {show: true}, // 오른쪽 Y축 좌우 경계 선 보여줄지 여부
                title: {text: 'Bar'}, // 오른쪽 Y축 제목
                tooltip: {enabled: true}, // 툴팁 사용 여부
            },
        ],

        xaxis: {
            // X축
            categories: timeList, // 카테고리 목록
            tickAmount: 13, // 나타낼 라벨 개수
            title: {text: '2023-02-05일자', offsetX: -600},
            labels: {
                rotate: 0,
            },
        },
        annotations: {
            points: handlePoints(),
        },
        tooltip: {
            custom: ({dataPointIndex}: dataPointType) =>
                createCustomTooltip({
                    dataPointIndex,
                    timeList,
                    barList,
                    areaList,
                    idList,
                    queries,
                }),
            marker: {
                fillColors: [CHART_COLOR.area, CHART_COLOR.bar], // 툴팁 마커 색상 설정
            },
        },
    };

    return (
        <Container>
            <Filter />
            <ApexCharts series={series} options={chartOptions} />
        </Container>
    );
};

export default Chart;

const Container = styled.div`
    position: relative;
    width: 100%;
    max-width: 1400px;
    margin: 50px;
`;

function createCustomTooltip({
    dataPointIndex,
    timeList,
    barList,
    areaList,
    idList,
    queries,
}: {
    dataPointIndex: number;
    timeList: string[];
    barList: number[];
    areaList: number[];
    idList: string[];
    queries: string[];
}) {
    return renderToString(
        <ul>
            <li>{timeList[dataPointIndex]}</li>
            <li>
                <div
                    style={{
                        background: queries.includes(idList[dataPointIndex])
                            ? '#45a054'
                            : '#66C7F4',
                        width: '10px',
                        height: '10px',
                        borderRadius: '10px',
                    }}
                ></div>
                <div>Area:</div>
                <div>{areaList[dataPointIndex]}</div>
            </li>
            <li>
                <div
                    style={{
                        background: queries.includes(idList[dataPointIndex])
                            ? '#e9184b'
                            : '#99C2A2',
                        width: '10px',
                        height: '10px',
                        borderRadius: '10px',
                    }}
                ></div>
                <div>Bar:</div>
                <div>{barList[dataPointIndex]}</div>
            </li>
            <li>
                <div>지역:</div>
                <div>{idList[dataPointIndex]}</div>
            </li>
        </ul>
    );
}
