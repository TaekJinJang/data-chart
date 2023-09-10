import {getChartData} from 'apis/chart';
import useChartData from 'hooks/useChartData';
// import { useEffect } from "react"

const Home = () => {
    const {timeList, idList, barList, areaList} = useChartData();
    console.info(timeList, idList, barList, areaList);

    return <div>gdgd</div>;
};

export default Home;
