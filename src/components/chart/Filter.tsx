import useQuerystring from 'hooks/useQueryString';
import styled from 'styled-components';
import {BUTTON_COLOR} from 'styles/colors';

const Filter = ({idList}: {idList: string[]}) => {
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
                        $active={queries.includes(filter).toString()}
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
    margin: 30px 0 0 50px;
`;

const FilterButton = styled.button<{$active?: string}>`
    background-color: ${({$active}) =>
        $active === 'true' ? BUTTON_COLOR.active : BUTTON_COLOR.default};
    border-radius: 50px;
    border-color: gray;
    margin-left: 20px;
    display: inline-block;
    &:hover {
        background-color: ${BUTTON_COLOR.active};
    }
`;
