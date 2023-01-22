import styled from 'styled-components'
import { useState, useEffect } from 'react';
import {BiSearchAlt2} from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';


const Search = () => {
    const [input, setInput] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/searched/' + input)
        setInput('');
    }

    return(
        <FormStyle onSubmit={handleSubmit}>
            <div>
                <BiSearchAlt2 />
                <input onChange={(e) => setInput(e.target.value)} type="text" value={input} />
            </div>
        </FormStyle>
    )
}

const FormStyle = styled.form`
    
    
    div{
        margin: 0 auto;
        width: 70%;
        position: relative;
        
    }
    input{
        border: none;
        background: linear-gradient(35deg, #494949, #31313a);
        font-size: 1.5rem;
        color: #fff;
        padding: 1rem 3rem;
        border-radius: 1rem;
        outline: none;
        width:100%;
    }
    svg{
        position: absolute;
        left: 0%;
        top: 50%;
        transform: translate(100%, -50%);
        color: #fff;
    }
   
`;

export default Search;