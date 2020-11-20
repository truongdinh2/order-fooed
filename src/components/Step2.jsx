import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, Input, FormHelperText} from '@material-ui/core';
import { data } from '../data/data';

function Step2(props) {
    // console.log(props.order)
    // const [hasError, setHasError] = useState(false)
    var isValidate = false
    const [restaurants, setRestaurants] = useState();
    const mealCategory = props.order;
    // console.log(mealCategory.meal);
    const restaurant = [];
    const allRestaurant = [];
    // console.log(allRestaurant);
    data.dishes.map((res) => {
        if (res.availableMeals.indexOf(mealCategory.meal) !== -1) {
            allRestaurant.push(res.restaurant)
        }
        return allRestaurant;
    })
    // console.log(restaurant);
    allRestaurant.map((res) => {
        if (restaurant.indexOf(res) === -1) {
            restaurant.push(res)
        }
        return restaurant;
    })
    // const res = restaurant.map((res,index) => {
    //     return(
    //         <option key = {index} value = {res}>
    //             {res}
    //         </option>
    //     )
    // })
    // setIsvalidate(true)
    if(!restaurants) {
        isValidate = true
        }
        console.log(isValidate)
        console.log(restaurants)
    function handleChange(event) {
        var res = restaurants;
        res = event.target.value;
        setRestaurants(res);
        props.getRes(res);
        
        
        // console.log(isValidate)
    }
    return (
        <div>
            <form className="step2">
                {/* <label>:^ Please select a restaurant</label>
                <select name="restaurant" className = "st2" onChange = {onchange}>
                <option value = 'a' disabled selected></option>
                    {res}
                </select> */}
                <FormControl margin="dense" style={{ width: "300px", marginLeft: '20px' }}>
                    <InputLabel
                        style={{ padding: '0' }}
                    >:^ Please choose a meal</InputLabel>
                    <Select
                        name="restaurant"
                        // value={selected}
                        input={<Input id="name" />}
                        onChange={(event) => handleChange(event)}
                    >
                        {restaurant.map((item) => {
                            return (
                                <MenuItem key={item} value={item}>
                                    {item}
                                </MenuItem>
                            );
                        })}
                    </Select>
                     <FormHelperText>{isValidate === true ? ' * This is required!' : ''}</FormHelperText>
                </FormControl>

                {/* <button type = "button">previous</button>
                <button 
                type = "button">next</button> */}
            </form>
        </div>
    );
}

export default Step2;
