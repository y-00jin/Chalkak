import { useEffect, useState } from 'react';

export default function Test() {

    const [tests, setTests] = useState([]);

    useEffect(() => {

        fetch(`${process.env.REACT_APP_API_BASE_URL}/api/tests`)
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
            {tests.map((data, index) =>{
                return <h1 key={index}>{data}</h1>
                }
            )}
        </>
    )
}