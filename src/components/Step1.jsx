
import React from 'react';
import { useState } from 'react';
import { data } from '../data/data';
function Step1(props) {
    const [order,setOrder] = useState({})
    const value = [];
    data.dishes.map((Data, index) => {
        Data.availableMeals.map((val) => {
            return value.push(val);
        })
        return (value);
    })
    const test = value.filter((item, index) => {
        return value.indexOf(item) === index
    })
    const mealCategory = test.map((val, key) => {
        return (
            <option key={key} value={val}>{val}</option>
        )
    })
    function handleChange(e) {
        var orderFood = order;
        if(e.target.name === "Meal" && e.target.value !== 'a') {
            orderFood.meal = e.target.value
            setOrder(orderFood)
        }
        if(e.target.name === "num") {
            orderFood.num = e.target.value
            setOrder(orderFood)
        }
        props.getOrder(order)
    }
    return (
        <div>
            <form className = "step1">
                <label>:^ Please choose a meal</label>
                <select name="Meal" onChange={handleChange} required>
                    <option value = 'a' disabled selected></option>
                    {mealCategory}
                </select>
                <label>
                    please enter number of people/
                </label>
                <input type="number" placeholder="1"
                    onChange={handleChange}
                    name="num" required></input>
            </form>
        </div>
    );
}

export default Step1;
