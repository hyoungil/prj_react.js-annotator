import { getFetchWithDelay } from './fetch';
import { putFetchWithDelay } from './fetch';
const url = "http://127.0.0.1:8002"

const getfakeData = () => getFetchWithDelay(url+" /api/get_viewData");
const putLabelBox = (param) => putFetchWithDelay(url + '/api/library', param);
const getImageUnitDate = (param) => getFetchWithDelay(url + '/api/unit_data?imgIdx=' + param);

export const userAPI = {
    getfakeData,
    putLabelBox,
    getImageUnitDate,
};