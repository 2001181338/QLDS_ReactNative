import axios from "axios";
import { localHost } from "../variable-contants/variable-contants";

class DatVeService {

    onDatVe = (model) => {
        return axios.post(localHost + '/api/ve/dat-ve', model);
    }
    onThanhToan = (model) => {
        return axios.post(localHost + '/api/ve/thanh-toan', model);
    }
    onTraVe = (model) => {
        return axios.post(localHost + '/api/ve/tra-ve', model);
    }
}


export const datVeService = new DatVeService();