import { useEffect, useState } from "react";

export const useDateTime = () => {

    // crea un nuevo objeto `Date`
    const today = new Date();

    // obtener la fecha y la hora
    let time = today.toLocaleTimeString();

    const [currentTime, setCurrentTime] = useState(time);


    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    options.timeZone = "America/Guayaquil";

    const currentDate = today.toLocaleDateString("es-ES", options);

    const updateTime = () => {
        let time = new Date().toLocaleTimeString();
        setCurrentTime(time);
    }

    useEffect(() => {
        const interval = setInterval(updateTime, 1000);

        return () => {
            clearInterval(interval);
          }
    }, []);



    return {
        today,
        time,
        currentDate,
        currentTime
    };
};
