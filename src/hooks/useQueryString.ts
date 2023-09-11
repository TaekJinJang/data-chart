import {useSearchParams} from 'react-router-dom';

export default function useQuerystring() {
    const [searchParams, setSearchParams] = useSearchParams();

    const queries = searchParams.getAll('filter');

    const addQuery = (value: string) => {
        if (value === undefined) return;
        searchParams.append('filter', value);
        setSearchParams(searchParams);
    };

    const deleteQuery = (value?: string) => {
        searchParams.delete('filter');
        if (value) {
            queries
                .filter(query => query !== value)
                .forEach(query => searchParams.append('filter', query));
        }
        setSearchParams(searchParams);
    };

    return {queries, addQuery, deleteQuery};
}
