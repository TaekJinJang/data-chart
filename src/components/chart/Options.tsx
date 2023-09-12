import {ApexOptions} from 'apexcharts';
import {CHART_COLOR} from 'styles/colors';
import {dataPointType} from 'types/chart';

interface BaseProps {
    idList: string[];
    queries: string[];
}

interface ChartEventsType extends BaseProps {
    addQuery: (value: string) => void;
    deleteQuery: (value: string) => void;
}

interface ColorsType extends BaseProps {}

interface AnnotationsType extends BaseProps {
    areaList: number[];
    timeList: string[];
}

interface XaxisType {
    timeList: string[];
}

interface Points {
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

export const getNoDataOption = () => ({
    text: 'Loading...',
    style: {
        fontSize: '40px',
    },
});

export const getLegendOption = (): Partial<ApexOptions['legend']> => ({
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
});

export const getChartEventsOption = ({
    idList,
    queries,
    addQuery,
    deleteQuery,
}: ChartEventsType): Partial<ApexOptions['chart']> => ({
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
});

export const getColorsOption = ({idList, queries}: ColorsType): Partial<ApexOptions['colors']> => {
    return [
        CHART_COLOR.area,
        ({dataPointIndex}: dataPointType) => {
            const filterData = idList[dataPointIndex];
            return queries.includes(filterData) ? CHART_COLOR.barFilter : CHART_COLOR.bar;
        },
    ];
};

export const getFillOption = (): Partial<ApexOptions['fill']> => ({
    opacity: [1, 0.5],
});
export const getStrokeOption = (): Partial<ApexOptions['stroke']> => ({
    width: [3, 0], //(선 그래프에서 선 또는 테두리 너비)
    curve: 'smooth', //(선 그래프에서 곡선 유형)
});
export const getYaxisOption = (): ApexYAxis[] => [
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
];
export const getXaxisOption = ({timeList}: XaxisType): Partial<ApexOptions['xaxis']> => ({
    // X축
    categories: timeList, // 카테고리 목록
    tickAmount: 13, // 나타낼 라벨 개수
    title: {text: '2023-02-05일자', offsetX: -600},
    labels: {
        rotate: 0,
    },
});
export const getAnnotationsOption = ({idList, areaList, timeList, queries}: AnnotationsType) => {
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
    return {points: setOptions};
};
