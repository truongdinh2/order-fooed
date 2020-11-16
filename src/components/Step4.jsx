import React from 'react';

function Step4(props) {
    const mainMeal3 = props.mainMeal;
    const restaurant = props.restaurant;
    const order = props.order;
    console.log(mainMeal3.orderFood);
    console.log(restaurant);
    console.log(order);
    return (
        <div>
            <form>
                <p>Meal: <span>{order.meal}</span></p>
                <p>Number of people: <span>{order.num}</span></p>
                <p>Restaurant: <span>{restaurant}</span></p>
                <div className="table4">
                <p>dishes:
                    <table >
                        <tr>
                            <th>name dish</th>
                            <th>number dish</th>
                        </tr>
                        {mainMeal3.orderFood.map((detail) => {
                            return (
                                <tr>
                                    <td>{detail.name}</td>
                                    <td>{detail.numberMeal}</td>
                                </tr>

                            )
                        })}
                    </table>
                </p>
                </div>
                {/* <button>done</button> */}
                {/* <button className = "btn">previous</button> */}
            </form>
        </div>
    );
}

export default Step4;
