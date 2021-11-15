import axios from "axios";
import { localHost } from "../variable-contants/variable-contants";

class ToaGheService {

    getGheByToa = (model) => {
        return axios.post(localHost + '/api/toa/get-ghe-by-toa', model);
    }
}


export const toaGheService = new ToaGheService();