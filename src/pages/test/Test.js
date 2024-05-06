import { useEffect, useState } from 'react';

export default function Test() {

    // const path = "http://192.168.0.245:8088";
    // const path = "http://localhost:8088";

        
    const [tests, setTests] = useState(['test000']);

    useEffect(() => {

        fetch(`/api/tests`)
            .then(res => res.json())
            .then(data => {
                const newItem = data.map(element => element.test_nm);
                setTests(prevTests => [...prevTests, ...newItem]);
            })
            .catch(error => {
                console.error('오류 발생:', error);
            });
            
    }, []);

    return (
        <>
            {tests.map(data =>{
                return <h1 key={data}>{data}</h1>
                }
            )}
        </>
    )
}