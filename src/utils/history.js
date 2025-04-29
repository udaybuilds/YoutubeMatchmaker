import axios from 'axios';
const BASE_URL="http://127.0.0.1:5000";

export default function saveHistory(data){
    const response= axios.post(`${BASE_URL}/savhistory`,data)
    console.log(response)
}

export function Interest_Analysis(data){
    const response = axios.post(`${BASE_URL}/Int_analysis`,data);
    return response
}

