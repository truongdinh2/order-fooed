import {
    FormControl,
    FormHelperText, InputLabel,
    MenuItem, Select, Table,
    TableBody,
    TableCell, TableHead,
    TableRow,
    TextField
} from "@material-ui/core";
import React, { useEffect, useState } from 'react';
import { data } from '../data/data';
function Step3(props) {
    const [isDataEnter, setIsdataEnter] = useState(false);
    const [isDataEnter1, setIsdataEnter1] = useState(false);
    const [dataEnter, setDataEnter] = useState({
        name: '',
        numberMeal: '',
    });
    const [listFood, setListFood] = useState([])
    // const arrDish = [];
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
    useEffect(() => {
        var arrDish = []
        data.dishes.map((val) => {
            if (val.restaurant === dish && val.availableMeals.indexOf(mealCategory.meal) !== -1) {
                arrDish.push(val.name)
            }
            return arrDish;
        })
        setListFood(arrDish)
    }, [])
    const enterData = () => {
        if (dataEnter.name !== '' && dataEnter.numberMeal > 0) {
            var newArr = listFood;
            newArr.splice(findItem(listFood, dataEnter.name), 1)
            setListFood(newArr)
            setArrData({
                orderFood: [
                    ...arrData.orderFood,
                    dataEnter,
                ]
            })
            // setDataEnter({ numberMeal: '', name: '' })
        }
        if (dataEnter.name === '') {
            setIsdataEnter(true)
        }
        if (dataEnter.numberMeal <1) {
            setIsdataEnter1(true)
        }
        setDataEnter({
            ...dataEnter,
            numberMeal: 0
        })
        // console.log(arrData)
        // console.log(dataEnter)
    }
    function findItem(Arr, value) {
        var result = -1;
        Arr.forEach((item, index) => {
            // console.log(item)
            if (item === value) {
                result = index
            }
        })
        return result
    }
    function handleSubmit(arrData) {
        // props.getData3(arrData);
        arrData.preventSubmit();
    }
    console.log(dataEnter.name)
    console.log(dataEnter)
    return (
        <div>
            <form onSubmit={(arrData) => handleSubmit(arrData)} className="step3">
                <div className="left">
                    <FormControl margin="dense" style={{ width: "300px", marginLeft: "20px" }}>
                        {/* <InputLabel htmlFor="my-input">
                            Please enter no. of servings
                        </InputLabel> */}
                        <select
                            className="select"
                            // defaultValue={listFood[0]}
                            onChange={(e) => setDataEnter({ ...dataEnter, name: e.target.value })}
                            name="name"
                        >
                            <option value="" className="opt" selected>
                                {/* {isDataEnter === true || isDataEnter1 === true ? "hi" : ''} */}
                                meal
                            </option>

                            {listFood.map((item) => {
                                return (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                );
                            })}
                        </select>
                        <FormHelperText
                            style={{ color: 'red' }}
                        >
                            {isDataEnter === true ? "* please fill this form" : ''}
                        </FormHelperText>
                    </FormControl>

                </div>
                <div className="right">
                    <TextField
                        style={{ width: "200px", marginLeft: '20px' }}
                        value={dataEnter.numberMeal}
                        onChange={(e) => setDataEnter({ ...dataEnter, numberMeal: e.target.value })}
                        name="nameDish"
                        id="standard-number"
                        label="Please enter number"
                        type="number"
                        InputProps={{
                            inputProps: {
                                max: 20, min: 0
                            }
                        }}

                    />
                    <FormHelperText
                        style={{ width: "300px", marginLeft: "20px", color: 'red' }}>
                        {isDataEnter1 === true ? "* please fill this form" : ''}
                    </FormHelperText>

                </div>
                <img src="https://cdn3.iconfinder.com/data/icons/eightyshades/512/14_Add-512.png" alt="icon"
                    onClick={enterData} />
                {/* <span>add </span> */}
            </form>

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
                                {row.name !== '' ? row.name : "hi"}
                            </TableCell>
                            <TableCell>{row.numberMeal}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </div>
    );
}

export default Step3;