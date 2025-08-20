import { useEffect } from 'react';
;
import { useNavigate } from 'react-router-dom';



const useAuth = (isLoggedIn: any) => {
    const navigate = useNavigate();


    useEffect(()=>{
        if(!isLoggedIn){
            navigate('/')
        }
    },[isLoggedIn, navigate])
}


export default useAuth