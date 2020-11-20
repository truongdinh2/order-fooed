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
        numberMeal: ''
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

    function handleChange(e) {
        if (e.target.name === 'name') {
            setDataEnter({
                name: e.target.value,
                numberMeal: dataEnter.numberMeal
            })
        }
        if (e.target.name === 'nameDish') {
            setDataEnter({
                name: dataEnter.name,
                numberMeal: e.target.value
            })
        }
        console.log(dataEnter)
        setIsdataEnter(false)
        setIsdataEnter1(false)
        // setDataEnter('')

    }
    const enterData = () => {


        if (dataEnter.name !== '' && dataEnter.numberMeal !== '') {
            var newArr = listFood;
            newArr.splice(findItem(listFood, dataEnter.name), 1)
            setListFood(newArr)
            setArrData({
                orderFood: [
                    ...arrData.orderFood,
                    dataEnter,
                ]
            });
        }
        if (dataEnter.name === '') {
            setIsdataEnter(true)
        }
        if (dataEnter.numberMeal === '') {
            setIsdataEnter1(true)
        }
        setDataEnter({
            name: '',
            numberMeal: ''
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
    // console.log(arrData.orderFood[0].name)
    // console.log(isDataEnter)
    // console.log("step 333333333333333333")
    return (
        <div>
            <form onSubmit={(arrData) => handleSubmit(arrData)} className="step3">
                <div className="left">
                    <FormControl margin="dense" style={{ width: "300px", marginLeft: "20px" }}>
                        <InputLabel htmlFor="my-input">
                            Please enter no. of servings
                        </InputLabel>
                        <Select

                            // defaultValue={listFood[0]}
                            onChange={(event) => handleChange(event)}
                            name="name"
                        >
                            <MenuItem selected>
                            {isDataEnter === true || isDataEnter1 === true? "hi" : ''} 
                            </MenuItem> 
                            
                            {listFood.map((item) => {
                                return (
                                    <MenuItem key={item} value={item}>
                                        {item}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                        <FormHelperText
                            style={{ color: 'red' }}
                        >
                            {isDataEnter === true ? "* please fill this form" : ''}
                        </FormHelperText>
                    </FormControl>

                </div>
                <div className="right">
                    {/* <label>Please enter number</label>
                    <input type="number" onChange={(e) => onChangeNumber(e)} name="nameDish"></input> */}
                    <TextField
                        style={{ width: "200px", marginLeft: '20px' }}
                        onChange={(e) => handleChange(e)}
                        name="nameDish"
                        id="standard-number"
                        label="Please enter number"
                        type="number"
                        InputProps={{
                            inputProps: {
                                max: 20, min: 1
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