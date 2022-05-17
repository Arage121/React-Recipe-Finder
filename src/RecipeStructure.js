
import { Typography } from '@mui/material';
import React, {Component} from 'react';
import "./css/Recipe-struct.css";
import LikeButton from "./likebtn/LikeButton"         //Like button will be imported from another file to make code clean and to make sure the file is not overcrowded with setState methods

class RecipeStructure extends Component{

    constructor()
    {
        
        super();
        this.state = {                                  //Added for the sake of future use
        }
    }


    array = () =>{                                      //Created 20 numbers and used them to map ingredients array
        let array = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
        let filtered = array.filter(n=> (this.props.recipe["strIngredient"+n] !=="" && this.props.recipe["strIngredient"+n] !== null ))
        return filtered;                                //returned only those ingredient numbers which had ingredients listed
        
    }

    render(){
        return (
            <div className = "cardContainer">
                            <div className = "card-header-container">  {/*Added heading with an achor tag which directs to the source url of the recipe provided by the api*/}
                                <div className = "recipe-heading"  style = {{fontWeight: 'bold'}}><a href = {this.props.recipe.strSource} rel="noopener noreferrer" target = "_blank">{this.props.recipe.strMeal}</a></div>
                                <LikeButton  id = {"like"+this.props.i} num = {this.props.i}/>    {/*Like button comonent is called here for a card */}
                            </div>

                            <div className = "cardContent">
                                <div className = "left">    {/*Created left right classes to divide the picture and content in a way that was required */}
                                    <img className = "pic"src = {this.props.recipe.strMealThumb} alt = {this.props.recipe.strMeal} />  {/*Used image from api data */}
                                </div>
                            
                                <div className = "right">   {/*Created left right classes to divide the picture and content in a way that was required */}
                                    <div className = "description">
                                        <Typography><span style = {{fontStyle: "italic"}}>Category of Meal - {this.props.recipe.strCategory}</span></Typography>
                                        <Typography><span style = {{fontStyle: "italic"}}>Area of the Meal - {this.props.recipe.strArea}</span></Typography>
                                    </div>
                                    <div>
                                        <Typography><span style = {{fontStyle: "italic"}}>Ingredients</span></Typography>
                                        <div className = "ingredients-container">       {/*We map through the array of numbers where strIngredients key has values and we used the same numbers to get the strMeasure values and showed them in a typography element */}
                                            {this.array().map(n => {
                                                return (<Typography style = {{paddingLeft:10, marginBottom:20}}key ={this.props.recipe.idMeal+n}><span>{this.props.recipe["strIngredient"+n]} --- {this.props.recipe["strMeasure"+n]}</span></Typography>)
                                                }
                                            )}
                                        </div>
                                        <div className = "recipe">          {/*We get recipe data from the api */}
                                            <Typography style = {{textAlign: 'center'}}><span style = {{fontStyle:"italic"}}>Recipe</span></Typography>
                                            <div className = "recipe-container">
                                                <Typography>{this.props.recipe.strInstructions}</Typography>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
            </div>

        )
    }

}

export default RecipeStructure;



