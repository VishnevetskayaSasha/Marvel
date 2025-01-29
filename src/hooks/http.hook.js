import { useState, useCallback } from "react";

// создание собственного хука
export const useHttp = () => {
  //const [loading, setLoading] = useState(false);
 // const [error, setError] = useState(null);
  const [process, setProcess] = useState("waiting"); // начальное состояние - ожидание

  const request = useCallback(async (url, method = "GET", body = null, headers = {"Content-Type": "application/json"}) => {

    //setLoading(true);
    setProcess("loading"); // в запросе состояние меняется на загрузку

    try {
      const response = await fetch(url, {method, body, headers});

      if (!response.ok) {
        throw new Error (`Could not frtch ${url}, status: ${response.status}`);
      }

      const data = await response.json();

      //setLoading(false);
      return data;
    } catch(e) {
      //setLoading(false);
      //setError(e.message);
      setProcess("error"); // если произошла ошибка, состояние меняется на ошибку
      throw e;
    }
  }, []);

  const clearError = useCallback(() => {
    //setError(null);
    setProcess("loading"); // очищаем состояние ошибки и возващаем состояние загрузки
  }, []); 

  return {
    // loading, 
    request, 
    // error, 
    clearError, 
    process, 
    setProcess}

}