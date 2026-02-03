import axios from "axios";

const baseURL=import.meta.env.VITE_BACKEND_BASE_API
const axiosInstance=axios.create({
    baseURL:baseURL,
    headers:{
        'Content-Type':'application/json'
    }
})
//request interceptor
axiosInstance.interceptors.request.use(
    function(config){
        console.log('req without auth header==>',config)
        const accessToken=localStorage.getItem('accessToken')
        if(accessToken){
            // inject the authorization in the headers
            config.headers['Authorization']=`Bearer ${accessToken}`
  
        }
              return config;
    },
    function(error){
        return Promise.reject(error)
    }
)

//res interceptor

axiosInstance.interceptors.response.use(
    function(response){
        return response;
    },
    //handle failed response
  async function(error){
    const originalRequest=error.config;
    if(error.response.status===401 && !originalRequest.retry){
        originalRequest.retry=true;
        const refreshToken=localStorage.getItem('refreshToken')
        try{
            const response= await axiosInstance.post('/token/refresh/',{refresh:refreshToken})
         
            //save new access token
            localStorage.setItem('accessToken',response.data.access)
            originalRequest.headers['Authorization']=`Bearer ${response.data.access}`
            return axiosInstance(originalRequest)
        }catch(error){
           localStorage.removeItem('accessToken')
           localStorage.removeItem('refreshToken')
          
        }
        return Promise.reject(error);
    }
  }

)
export default axiosInstance;