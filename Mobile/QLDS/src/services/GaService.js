import axios from "axios";
import { localHost } from "../variable-contants/variable-contants";

class GaService {

    getAllGa = () => {
        return axios.get(localHost + '/api/ga/get-all');
    }
}


export const gaService = new GaService();