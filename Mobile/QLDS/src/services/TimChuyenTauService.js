import axios from "axios";
import { localHost } from "../variable-contants/variable-contants";

class TimChuyenTauService {

    onTimChuyenTau = (model) => {
        return axios.post(localHost + '/api/tuyen/tim-tuyen', model);
    }
}


export const timChuyenTauService = new TimChuyenTauService();