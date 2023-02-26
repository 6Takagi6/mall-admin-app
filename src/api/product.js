import axios from "@/axios"
export default
    {
        list(params) {
            return axios.get('/products/all', { params }) //得到产品数据
        },
        remove(params) {
            return axios.delete('/products/' + params.id)
        }
    }