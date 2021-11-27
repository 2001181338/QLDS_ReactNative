import axios from "axios";
import { localHost } from "../variable-contants/variable-contants";

class VeService {

    onGetDanhSachVe = (model) => {
        return axios.post(localHost + '/api/timkiemthongtinvedat/get-danh-sach-ve', model);
    }
}


export const veService = new VeService();