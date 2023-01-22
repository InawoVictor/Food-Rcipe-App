import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

const Searched = () => {
    const [searchedRecipe, setSearchedRecipe] = useState([])
    const [isPending, setIsPending] = useState(false);
    let params = useParams()

    const getSearched = async (name) => {
        setIsPending(true)
        const data = await fetch(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`
        );
        const recipes = await data.json();
        setSearchedRecipe(recipes.results);
        
    }

    useEffect(() => {
        setTimeout(() =>{
            getSearched(params.search);
            setIsPending(false);
        }, 1000)
        
    }, [params.search])

  return(
      
    <div>
        {isPending && <h2>Loading...</h2>}
        <Grid>
            {
                searchedRecipe.map((recipe) => {
                    return(
                        
                            <Card key={recipe.id}>
                                <Link to={"/recipe/details/" + recipe.id} >
                                    <img src={recipe.image} alt={recipe.name} />
                                    <h4>{recipe.title}</h4>
                                </Link>
                            </Card>
                        
                    )    
                })
            }
        </Grid>
    </div>
      
  )
    
  
}

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    grid-gap: 3rem;
`;

const Card = styled.div`
    img {
        width: 100%;
        border-radius: 2rem;
    }
    a {
        text-decoration: none;
    }
    h4{
        text-align: center;
        padding: 1rem;
    }
`;


export default Searched
