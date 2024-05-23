import { Component, useEffect, useState } from "react";
import MealItem from "./MealItem";
import useHttp, { DOMAIN } from "../api/agent";
import Error from "./UI/Error";

const requestConfig = {};

export default function Meals() {
    const { data: loadedMeals, isLoading, error } = useHttp(`${DOMAIN}/meals`, requestConfig, []);

    return <ul id="meals">
        {error && <Error title="Failed to fetch meals" message={error}></Error>}
        {isLoading && <p className="center">Please wait</p>}
        {loadedMeals.length > 0 && loadedMeals.map((item, index) =>
            <MealItem key={index} {...item}></MealItem>
        )}
        {!error && !loadedMeals.length && !isLoading && "There are no  meals in the database."}
    </ul>
}

// export default class Meals extends Component {
//     constructor() {
//         super();
//         this.state = {
//             error: null,
//             isLoading: true,
//             mealList: []
//         }
//     }

//     componentDidMount() {
//         this.fetchMeals();
//     }

//     async fetchMeals() {
//         try {
//             const fetchedResponse = await fetch(`${DOMAIN}/meals`);

//             if (!fetchedResponse.ok) {
//                 this.setState({ error : `Failed to fetch. Status: ${fetchedResponse.status}`});
//                 return;
//             }

//             const meals = await fetchedResponse.json();
//             this.setState({
//                 mealList: meals
//             });
//         }
//         finally {
//             this.setState({
//                 isLoading: false
//             });
//         };
//     }

//     render() {
//         return <ul id="meals">
//             {this.state.error && <Error title="Failed to fetch meals" message={this.state.error}></Error>}
//             {this.state.isLoading && "Please wait"}
//             {this.state.mealList.length > 0 && this.state.mealList.map((item, index) =>
//                 <MealItem key={index} {...item}></MealItem>
//             )}
//             {!this.state.error && !this.state.mealList.length && !this.state.isLoading && "There are no  meals in the database."}
//         </ul>
//     }
// }