import Chart from 'components/chart/Chart';
import ChartHeader from 'components/chart/ChartHeader';
import styled from 'styled-components';

const Home = () => {
    return (
        <Container>
            <ChartHeader />
            <Chart />
        </Container>
    );
};

export default Home;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #f0f0f0;
    min-height: 100vh;
`;
