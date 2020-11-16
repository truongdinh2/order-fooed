import React, { useState } from 'react';
import {data} from '../data/data';

function Step2(props) {     
    // console.log(props.order)
    const [restaurants,setRestaurants] = useState({});
    const mealCategory = props.order;
    // console.log(mealCategory.meal);
    const restaurant =[];
    const allRestaurant = [];
    // console.log(allRestaurant);
    data.dishes.map((res)=>{
        if(res.availableMeals.indexOf(mealCategory.meal) !== -1) {
            allRestaurant.push(res.restaurant)
        }
        return allRestaurant;
    })
    // console.log(restaurant);
    allRestaurant.map((res) => {
        if(restaurant.indexOf(res) === -1) {
            restaurant.push(res)
        }
        return restaurant;
    })
    const res = restaurant.map((res,index) => {
        return(
            <option key = {index} value = {res}>
                {res}
            </option>
        )
    })
    function onchange(event) { 
        var res = restaurants;
        res = event.target.value;
        setRestaurants(res);
        props.getRes(res);
        // console.log(res)
    }
    return (
        <div>
            <form className = "step2">
                <label>:^ Please select a restaurant</label>
                <select name="restaurant" className = "st2" onChange = {onchange}>
                <option value = 'a' disabled selected></option>
                    {res}
                </select>
                {/* <button type = "button">previous</button>
                <button 
                type = "button">next</button> */}
            </form>
        </div>
    );
}

export default Step2;