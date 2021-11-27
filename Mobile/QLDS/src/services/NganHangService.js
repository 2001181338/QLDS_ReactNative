import axios from "axios";
import { localHost } from "../variable-contants/variable-contants";

class NganHangService {

    onDangNhap = (model) => {
        return axios.post(localHost + '/api/nganhang/dangnhap', model);
    }
}


export const nganHangService = new NganHangService();