import React, { useState, useEffect } from 'react';
import { data } from '../data/data';
import {
    Table,
    TableBody,
    TableHead,
    TableCell,
    TableRow,
} from "@material-ui/core";
function Step3(props) {
    const [dataEnter, setDataEnter] = useState({
        name: '',
        numberMeal: 0
    });
    const arrDish = [];
    const dish = props.restaurant;
    const mealCategory = props.order;
    const [arrData, setArrData] = useState({
        orderFood: [
            // {name: "Kung Pao", numberMeal: "10" }
        ]
    });
    useEffect(() => {
        // console.log(arrData)
        props.getData3(arrData)
    }, [arrData])

    data.dishes.map((val) => {
        if (val.restaurant === dish && val.availableMeals.indexOf(mealCategory.meal) !== -1) {
            arrDish.push(val.name)
        }
        return arrDish;
    })
    // console.log(arrDish);
    const name = arrDish.map((val, index) => {
        return (
            <option value={val} key={index}>{val}</option>
        )
    });
    const onChangeName = (e) => {
        // console.log(dataEnter)
        // var valEnter = dataEnter;
        // valEnter.name = e.target.value;
        const name = e.target.value;
        setDataEnter({
            name: name,
            numberMeal: dataEnter.numberMeal
        });
    }
    const onChangeNumber = (e) => {
        const number = e.target.value;
        setDataEnter({
            name: dataEnter.name,
            numberMeal: number
        })
    }
    const enterData = () => {
        // console.log(arrData)
        setArrData({
            orderFood: [
                ...arrData.orderFood,
                dataEnter,
            ]
        });
        console.log(arrData)
        // props.getData3(arrData);
        // console.log(dataEnter)
    }
    // console.log(arrData)
    function handleSubmit(arrData) {
        // props.getData3(arrData);
        arrData.preventSubmit();
    }
    return (
        <div>
            <form onSubmit={(arrData) => handleSubmit(arrData)} className = "step3">
                <div className="left">
                    <label>Please select a dish</label>
                    <select onChange={(e) => onChangeName(e)} name="name">
                        <option value='a' disabled selected></option>
                        {name}
                    </select>
                </div>
                <div className="right">
                    <label>Please enter number</label>
                    <input type="number" placeholder="1" onChange={(e) => onChangeNumber(e)} name="nameDish"></input>
                </div>
                <img src="https://cdn3.iconfinder.com/data/icons/eightyshades/512/14_Add-512.png" alt="icon"
                    onClick={enterData} />
                <span>add </span>
            </form>
            <table>
                <Table className="crud-table table3">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ width: "300px" }}>Dishes </TableCell>
                            <TableCell>Number Of Servings</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {arrData && arrData.orderFood.map((row, index) => (
                            <TableRow key={row.dish}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell>{row.numberMeal}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </table>
        </div>
    );
}

export default Step3;