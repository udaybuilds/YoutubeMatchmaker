import axios from 'axios';
const BASE_URL="http://127.0.0.1:5000";

export default function matchmaker(data){
    const response= axios.post(`${BASE_URL}/matchmaker`,data)
    console.log("In match")
    console.log(response)
    return response
}