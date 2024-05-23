import { Component, useEffect, useState } from "react";
import MealItem from "./MealItem";
import useHttp, { DOMAIN } from "../api/agent";

const requestConfig = {};

// export default function Meals() {
//     const { data: loadedMeals, isLoading, error } = useHttp(`${DOMAIN}/meals`, requestConfig, []);

//     return <ul id="meals">
//         {isLoading && <p className="center">Please wait</p>}
//         {loadedMeals.length > 0 && loadedMeals.map((item, index) =>
//             <MealItem key={index} {...item}></MealItem>
//         )}
//         {!loadedMeals.length && !isLoading && "There are now  meals in the database."}
//     </ul>
// }

export default class Meals extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            mealList: []
        }
    }

    componentDidMount() {
        this.fetchMeals();
    }

    async fetchMeals() {
        try {
            const fetchedResponse = await fetch(`${DOMAIN}/meals`);
            const meals = await fetchedResponse.json();
            this.setState({
                mealList: meals
            });
        } finally {
            this.setState({
                isLoading: false
            });
        };
    }

    render() {
        return <ul id="meals">
            {this.state.isLoading && "Please wait"}
            {this.state.mealList.length > 0 && this.state.mealList.map((item, index) =>
                <MealItem key={index} {...item}></MealItem>
            )}
            {!this.state.mealList.length && !this.state.isLoading && "There are now  meals in the database."}
        </ul>
    }
}