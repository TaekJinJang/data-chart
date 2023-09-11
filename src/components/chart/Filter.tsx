import useChartData from 'hooks/useChartData';
import styled from 'styled-components';

const Filter = () => {
    const {idList} = useChartData();
    const filterList = [...new Set(idList)];
    return (
        <Container>
            {filterList.map((filter, index) => {
                return (
                    <FilterButton id={filter} value={filter}>
                        {filter}
                    </FilterButton>
                );
            })}
        </Container>
    );
};

export default Filter;

const Container = styled.div`
    margin-left: 50px;
`;

const FilterButton = styled.button`
    border-radius: 50px;
    border-color: gray;
    margin-left: 20px;
    display: inline-block;
`;
