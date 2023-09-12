import {renderToString} from 'react-dom/server';
import styled from 'styled-components';
import {CHART_COLOR} from 'styles/colors';
import LocationIcon from './icon/locationIcon';

interface TooltipType {
    dataPointIndex: number;
    timeList: string[];
    barList: number[];
    areaList: number[];
    idList: string[];
    queries: string[];
}

const CustomTooltip = ({
    dataPointIndex,
    timeList,
    barList,
    areaList,
    idList,
    queries,
}: TooltipType) => {
    return renderToString(
        <Container>
            <Header>
                {' '}
                <LocationIcon size={16} />
                <span>{idList[dataPointIndex]}</span>
            </Header>

            <Section>
                <AreaIcon />

                <span>Area:</span>
                <span>{areaList[dataPointIndex]}</span>
            </Section>
            <Section>
                <BarIcon $active={queries.includes(idList[dataPointIndex]).toString()} />
                <span>Bar:</span>
                <span>{barList[dataPointIndex]}</span>
            </Section>
            <TimeBold>{timeList[dataPointIndex]}</TimeBold>
        </Container>
    );
};

export default CustomTooltip;

const Container = styled.div`
    width: 100px;
    height: 80px;
`;
const Header = styled.div`
    font-size: 16px;
    text-align: center;
    margin: 5px 0;
`;
const AreaIcon = styled.div`
    background-color: ${CHART_COLOR.area};
    width: 10px;
    height: 10px;
    border-radius: 10px;
`;
const BarIcon = styled.div<{$active: string}>`
    background-color: ${({$active}) =>
        $active === 'true' ? CHART_COLOR.barFilter : CHART_COLOR.bar};
    width: 10px;
    height: 10px;
    border-radius: 10px;
`;

const Section = styled.div`
    margin: 5px 5px;
    display: flex;
    font-size: 14px;
    align-items: center;
    span {
        margin: 0 4px;
    }
`;

const TimeBold = styled.div`
    font-weight: 700;
    font-size: 14px;
    margin-left: 5px;
    text-align: center;
`;
