import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from 'styled-components';

const RecipeDetails = () => {
    const [details, setDetails] = useState({});
    const [tabs, setTabs] = useState('instructions')
    const [isPending, setIsPending] = useState(true);

    let params = useParams();

    const fetchDetails = async () => {
        const api = await fetch(`https://api.spoonacular.com/recipes/${params.title}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
        const data = await api.json();
        setDetails(data);
        console.log(details);
        setIsPending(false)
    }

    useEffect(() => {
        fetchDetails()
    }, [params.title])

  return (
        <div>
            {isPending && <h2>Loading...</h2>}
            <DetailsWrapper>
                <div>
                    <h2>{details.title}</h2>
                    <img src={details.image} alt={details.name} />
                </div>
                <Info>
                    <Button 
                        onClick={() => setTabs('instructions')}
                        className={tabs === 'instructions'? 'active':''}
                        >
                        Instructions
                    </Button>
                    <Button
                        onClick={() => setTabs('ingridients')}
                        className={tabs === 'ingridients'? 'active':''}>
                        Ingridients
                    </Button>
                    {tabs === 'instructions' && (
                        <div>
                            <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
                            <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
                        </div>
                    )}
                    {tabs === 'ingridients' && (
                        <ul>
                            {details.extendedIngredients.map((ingridients) => {
                                return (<li key={ingridients.id}>{ingridients.original}</li>)
                            })}
                        </ul>
                        
                    )}
                </Info>
            </DetailsWrapper>
        </div>
  )
}

const DetailsWrapper = styled.div`
    margin-top: 10rem;
    margin-bottom: 5rem;
    display: flex;
    width: 100%;
    gap: 2rem;
    .active{
        background: linear-gradient(35deg, #494949, #313131);
        color: #fff;
    }
    h2{
        margin-bottom: 2rem;
    }
    li{
        font-size: 1.2rem;
        line-height: 2.5rem;
    }
    ul{
        margin-top: 2rem;
    }
`;

const Button = styled.button`
    padding: 1rem 2rem;
    color: #313131;
    background: #fff;
    border: 2px solid black;
    margin-right: 2rem;
    font-weight: 600;
`;

const Info = styled.div`
    margin-left: 2rem;
`;

export default RecipeDetails
