import styled from 'styled-components';

const ChartHeader = () => {
    return (
        <Header>
            <Title>시계열 차트</Title>
            <div>2023-02-01 서울시 데이터를 토대로 제작하였습니다.</div>
        </Header>
    );
};

export default ChartHeader;

const Header = styled.header`
    text-align: center;
    height: 100px;
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const Title = styled.h1`
    font-size: 2rem;
    margin-bottom: 10px;
    font-weight: 700;
`;
