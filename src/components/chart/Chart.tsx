import ApexCharts from 'react-apexcharts';
import useChartData from 'hooks/useChartData';
import styled from 'styled-components';
import {ApexOptions} from 'apexcharts';
import {CHART_COLOR, COMMON_COLOR} from 'styles/colors';
import Filter from './Filter';

const Chart = () => {
    const {timeList, idList, barList, areaList} = useChartData();

    const series = [
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

    const chartOptions: ApexOptions = {
        legend: {
            // 범례
            position: 'bottom', // 배치
            horizontalAlign: 'center', // 수평으로 가운데 정렬
            offsetY: -10, // Y축 오프셋(위치 조정)
            onItemClick: {
                toggleDataSeries: true, // 범례 항목 클릭 시 해당 데이터 시리즈를 토글(보이기/숨기기)
            },
            markers: {
                fillColors: ['#66C7F4', '#99C2A2'], // 범례 마커 색상 설정
            },
        },
        chart: {
            // 차트
            height: 350, // 높이 설정
            type: 'bar', // 차트 타입
        },
        // colors: ['#DB211D', '#6690FF'],
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
            title: {text: '2023-02-05일자', offsetX: -600, style: {color: COMMON_COLOR.xaxisTitle}},
            labels: {
                rotate: 0,
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
