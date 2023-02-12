import axios from 'axios'; 

const api =  axios.create({
     baseURL:'http://localhost:8082/HRC_FinalProject'  
})

export default api