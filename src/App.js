import Header from "./Header";
import Typography from '@mui/material/Typography';
import React, {Component} from 'react';
import "./App.css";
import RecipeStructure from "./RecipeStructure";   //created a seperate component for recipe cards which take the data from the api and on import send the recipe cards for display on home.js


class App extends Component{
    
    constructor()
    {
        super();
        this.state = {
            greetingDisplay : "dispBlock",   // states of the greeting message which displays when the page loads
            errorDisplay: "dispNone",        // states for the error message which displays when error occurs in api results
            searchInput: "",    
            recipes: null,
        }
        
    }

    searchInputChangeHandler = (event) =>{     // eventHandler called onChange of input field and it saves the state real time as the user enters input
        this.setState({searchInput: event.target.value})
    }

    recipeSearchHandler = async () =>{                                   //onCLicking the get recipes button,  we fetch the data using the input entered by user which we tracked continously using state.
        this.setState({recipes:null, errorDisplay: "dispNone"})
        let url = "https://www.themealdb.com/api/json/v1/1/search.php?s="+this.state.searchInput;  
        let response = await fetch(url);                                                   //Used Fetch API to get data from mealdb api
        let data = await response.json();
        this.setState({recipes: data.meals, greetingDisplay: "dispNone"})                  //Soon as we hit search, the greeting message disappears

        if (data.meals=== null || this.state.searchInput === ""){                          // if api call doesnt get the data or if the user didnt input anything, error message is displayed
            this.setState({errorDisplay: "DispBlock", recipes: null});
        }

    }
    

    render(){
        return (
            <div>
                <Header/>                                          {/*imported the header file which contains the heading of the page. Purpose is to reuse it if we decide to create more pages*/}
                <div>
                    <div className = "flex-container">              
                        <div className = "search">
                            <input placeholder = "Enter the Name of the Dish"
                            className="inp" style = {{paddingTop:10, paddingBottom:10, paddingLeft:20, paddingRight:20, fontSize:19, border: 0, borderRadius: 10}}
                            onChange = {this.searchInputChangeHandler}></input>
                        </div>
                        <div>
                            <button className = "btn" onClick = {this.recipeSearchHandler} >Get Recipes</button>
                        </div>
                    </div>
                    <Typography className = {this.state.errorDisplay} variant = "h6" style ={{textAlign:'center', marginTop: 16}}><span>No Data Has Been Recieved</span></Typography>
                    <Typography variant ="h5" className = {this.state.greetingDisplay} style ={{textAlign:'center', marginTop: 16, fontWeight: 'bold',fontSize:'30px'}}component = "div"><span>Type a Dish Name to Search for it's ingredient</span></Typography>
                    {(this.state.recipes != null) &&            /*We check if the data returned by api is not null, then we send that data in the form of props to the recipeCard.js file*/
                    this.state.recipes.map(recipe =>{           /* The dta recieved is an array. So we map that array and return a recipecard component for each index of the recipes array*/
                        let i =0;                               /*Defined this i to assign a different key and different attributes to each recipeCard */
                        i++
                        return <RecipeStructure key = {recipe.idMeal + i} id = {recipe.idMeal +i} likeId = {i} recipe = {recipe}/>

                    })
                    }
                    
                </div>
            </div>
        )
    }
}

export default App;
