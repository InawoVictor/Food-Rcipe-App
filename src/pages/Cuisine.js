import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import {motion} from 'framer-motion';
import {Link, useParams} from 'react-router-dom';

function Cuisine() {
    const [cuisine, setCuisine] = useState([])
    const [isPending, setIsPending] = useState(true)
    let params = useParams();

    useEffect(() => {
        setTimeout(() => {
            getCuisine(params.type)
            
        }, 1000)
       
    }, [params.type])

    const getCuisine = async (name) => {
        const data = await fetch(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`
        );
        const recipes = await data.json();
        setCuisine(recipes.results);
        setIsPending(false)
        
    }

  return (
        <div>
            {isPending && <h2>Loading...</h2>}
            <Grid
                animate={{opacity: 1}}
                intial={{opacity: 0}}
                exit={{opacity: 0}}
                transition={{duration: .5}}>
                {
                    cuisine.map((item) => {
                        return(
                            <Link to={"/recipe/details/" + item.id} key={item.id}>
                                <Card >
                                    <img src={item.image} alt={item.name} />
                                    <h4>{item.title}</h4>
                                </Card>
                            </Link>
                        )
                    })
                }
                
            </Grid>
        </div>
       
  )
}

const Grid = styled(motion.div)`
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

export default Cuisine
