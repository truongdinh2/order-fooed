import { FormControl, InputLabel, MenuItem, Select,Input,FormHelperText,TextField } from '@material-ui/core';
import React from 'react';
import { useState, useEffect } from 'react';
import { data } from '../data/data';
function Step1(props) {
    // var isValidate = true;
    // var isValidate1 = true;
    const [order, setOrder] = useState({
        meal:'',
        num:''
    })
    const [isValidate, setIsValidate] = useState(true)
    const [isValidate1, setIsValidate1] = useState(true)
    const value = [];

    useEffect(() => {
        if(order.meal) {
            setIsValidate(false)
        }
        if(order.num) {
            console.log(isValidate1)
            setIsValidate1(false)
        }
    }, [order])

    // useEffect(() => {
     
    // }, [input])

    data.dishes.map((Data, index) => {
        Data.availableMeals.map((val) => {
            return value.push(val);
        })
        return (value);
    })
    const test = value.filter((item, index) => {
        return value.indexOf(item) === index
    })
    // const mealCategory = test.map((val, key) => {
    //     return (
    //         <option key={key} value={val}>{val}</option>
    //     )
    // })
    function handleChange(e) {
        if (e.target.name === "Meal") {
            // orderFood.meal = e.target.value
            setOrder({
                meal: e.target.value,
                num: order.meal
            }
            )
        }
        if (e.target.name === "num") {
            // orderFood.num = e.target.value
            setOrder({
                meal:order.meal,
                num: e.target.value
            }
            )
        }
        

    }
    props.getOrder(order)
    // console.log(props.isValidate)
    // const isValidate = props.isValidate;
    
    return (
        <div>
            <form className="step1">
            <FormControl margin="dense" style={{ width: "300px" ,marginLeft:'20px'}} >
            <InputLabel htmlFor="my-input">:^ Please choose a meal</InputLabel>
                <Select
                    name="Meal"
                    // value={selected}
                    input={<Input id="name" />}
                    onChange={(event) => handleChange(event)}
                >
                    {test.map((item) => {
                            return (
                                <MenuItem key={item} value={item}>
                                    {item}
                                </MenuItem>
                            );
                        })}
                </Select>
                 <FormHelperText>{isValidate === true ? '* this is required!' : ''}</FormHelperText>
            </FormControl>
                <br/>
                {/* <small className = {render === true ? 'block' : 'none'}> * please fill into this form</small> */}
                <br/>
                <br/>
                <TextField  
                    style={{ width: "200px" ,marginLeft:'20px'}}
                    onChange={handleChange}
                    name="num"
                    id="standard-number"
                    label=" number of people"
                    type="number"
                    InputProps={{
                        inputProps: { 
                            max: 20, min: 1 
                        }
                    }}
                
                />
                    
                <FormHelperText style={{ width: "200px" ,marginLeft:'20px'}}>
                     {isValidate1 === true ? '* this is required!' : ''}
                </FormHelperText>

            </form>
        </div>
    );
}

export default Step1;