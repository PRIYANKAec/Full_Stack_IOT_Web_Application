import { useState } from "react";

export default function readValues() {
    const [readLoading, setReadLoading] = useState(null);
    const [readMessage, setReadMessage] = useState(null);
    const [readData, setReadData] = useState(null);

    const readSensor = async (values) => {
        try {
            setReadLoading(true);
            const res = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/sensor`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json', 
                },
                body: JSON.stringify(values)
            });

            const data = await res.json();
            if(res.status === 200) {
                setReadMessage(data.message);
                setReadData(data);
                console.log(data);
            } else if(res.status === 400) {
                setReadMessage(data.message);
            }else {
                setReadMessage(data.message);
            }
        } catch (error){
            setReadMessage(error);
        }finally{
            setReadLoading(false);
        }
    };
        return { readLoading, readSensor, readMessage, readData };
}