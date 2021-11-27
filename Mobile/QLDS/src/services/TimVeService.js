import axios from "axios";
import { localHost } from "../variable-contants/variable-contants";

class TimVeService {

    onTimVe = (model) => {
        return axios.post(localHost + '/api/timkiemthongtinvedat/timkiemve', model);
    }
}


export const timVeService = new TimVeService();