import useChartData from 'hooks/useChartData';
import useQuerystring from 'hooks/useQueryString';
import styled from 'styled-components';

const Filter = () => {
    const {idList} = useChartData();
    const {queries, addQuery, deleteQuery} = useQuerystring();

    const filterList = [...new Set(idList)];

    const handleFilterValue = (e: React.MouseEvent<HTMLButtonElement>) => {
        const {value} = e.currentTarget;
        console.info(value);
        if (value === 'ALL') return deleteQuery();
        if (queries.includes(value)) deleteQuery(value);
        else addQuery(value);
    };

    return (
        <Container>
            <FilterButton value='ALL' onClick={e => handleFilterValue(e)}>
                전체보기
            </FilterButton>
            {filterList.map((filter, index) => {
                return (
                    <FilterButton
                        active={queries.includes(filter)}
                        key={index}
                        value={filter}
                        onClick={e => handleFilterValue(e)}
                    >
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

const FilterButton = styled.button<{active?: boolean}>`
    background-color: ${({active}) => active && '#74d3a3'};
    border-radius: 50px;
    border-color: gray;
    margin-left: 20px;
    display: inline-block;
    &:hover {
        background-color: #74d3a3;
    }
`;
