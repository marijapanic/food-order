import { Component, useEffect, useState } from "react";
import MealItem from "./MealItem";

// export default function Meals() {
//     const [loadedMeals, setLoadedMeals] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         async function fetchMeals() {
//             try {
//                 const fetchedResponse = await fetch("http://localhost:3000/meals");
//                 const meals = await fetchedResponse.json();
//                 setLoadedMeals(meals);
//             } finally {
//                 setIsLoading(false);
//             };
//         }
//         fetchMeals();
//     }, []);

//     return <ul id="meals">
//         {isLoading && "Please wait"}
//         {loadedMeals.length > 0 && loadedMeals.map((item, index) =>
//             <li key={index}>{item.name}</li>
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
            const fetchedResponse = await fetch("http://localhost:3000/meals");
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