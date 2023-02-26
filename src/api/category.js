import axios from "@/axios.js"
export default
{
    list(params)
    {
        return axios.get("/category/all",{params});
    }
}