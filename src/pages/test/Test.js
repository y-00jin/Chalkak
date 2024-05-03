import { useEffect, useState } from 'react';

export default function Test() {

    const path = "http://192.168.0.245:8088";

    const [tests, setTests] = useState(['test000']);

    useEffect(() => {

        fetch(`${path}/tests`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('서버 응답이 정상이 아닙니다.');
                }
                return res.json();
            })
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