import React, { useState, useEffect } from "react";
import { LineChart, XAxis, YAxis, ResponsiveContainer, Tooltip, Line } from "recharts";

function useForceUpdate(){
    const [num, setNum] = useState(0);
    return () => setNum(num + 1);
}

const InvestmentTable = () => {

    const [data, setData] = useState([]);
    const [selected, setSelected] = useState([]);
    const [values, setValues] = useState([]);

    const forceUpdate = useForceUpdate();

    const getValues = () => {
        const request = {}
        const selectedScaled = []
        let total = 0
        for (let i = 0; i < selected.length; i++) {
            total += selected[i]
        }
        for (let i = 0; i < selected.length; i++) {
            selectedScaled.push(selected[i]/total * 100)
        }
        for (let i = 0; i < selectedScaled.length; i++) {
            request[data[i]["category"]] = selectedScaled[i];
        }
        fetch("http://localhost:8080/api/v1/forecast", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                request
            })
        })
        .then(res => res.json())
        .then(json => {
            console.log(json)
            const yVals = json.response;
            const points = [];
            points.push({year: 2021, amount: 10000})
            for (let i = 0; i < yVals.length; i++) {
                points.push({year: 2022 + i, amount: yVals[i]})
            }
            setValues(points);
            forceUpdate();
        });
    }

    useEffect(() => {
        const getData = async () => {

            const res = await fetch("http://localhost:8080/api/v1/forecast");
            res.json().then(json => {
                setData(json);
                setSelected(json.map(el => parseInt(el.minimum)));
            });
        }
        getData()
    }, []);

    useEffect(() => {
        if (selected.length !== 0)
            getValues();
    }, [selected]);

    const setSelectedValues = (e, i) => {
        const value = e.target.value;
        const newValues = selected;
        newValues[i] = parseInt(value);
        setSelected(newValues);
        console.log(selected);
        forceUpdate();
        getValues();
    }

    if (data.length === 0 || selected.length === 0) return <div> Loading... </div>
    // getValues();
    return (
        <>
        <div class="container-fluid">
        <br/>
        <h2>Investment Forecaster</h2>
        <p>This page allows you to customize your investments and view the potential growth of <b>$10,000</b> over a period of <b>10 years</b>.</p>
        </div>
        <div class = "container-fluid">
            {/* <ResponsiveContainer>  */}
                <LineChart 
                    width={900}
                    height={450}
                    data={values}
                >
                    <XAxis dataKey="year"/> 
                    <YAxis />
                    <Tooltip />
                    <Line dataKey="amount" stroke="#000080" />
                </LineChart>
            {/* </ResponsiveContainer>  */}
        </div>
        <div class="container-fluid">
        <h4>Investment Allocations</h4>
        <br />
        <table class="table">
            <thead>
            <tr>
                <th scope="col">Investment Category</th>
                <th scope="col">Minimum</th>
                <th scope="col">Historical Returns</th>
                <th scope="col">Initial Amount Invested</th>
                <th scope="col">Percentage</th>
            </tr>
            </thead>
            <tbody>
            {data.map((element, i) => {
                const { category, minimum, data } = element;
                return (
                <tr> 
                    <th scope="row"> {category} </th>
                    <td> {minimum} </td>
                    <td> {data.toString()} </td>
                    <td> {parseInt((selected[i] / 100) * 10000)}</td>
                    <td>
                        <select class="custom-select my-0 mr-sm-2" id="inlineFormCustomSelectPref" onChange={e => setSelectedValues(e, i)}>
                            <option selected={minimum} value={minimum}> {minimum} </option>
                            {[...Array(100 - minimum).keys()].map(num => <option value={num + 1 + parseInt(minimum)}> {num + 1 + parseInt(minimum)} </option>)}
                        </select>
                    </td> 
                </tr>)
            })}
            </tbody>
        </table>
        </div>
    </>
    );
};

export default InvestmentTable;
