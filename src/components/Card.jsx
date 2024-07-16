import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = (props) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/recipe/${props.idMeal}`);
    };

    return (
        <div className='w-full md :w-[273px] shrink-0 mb-3' onClick={handleClick}>
            <div className='group h-[182px] rounded-[15px] overflow-hidden relative'>
                <img className="group-hover:scale-110 duration-150 object-cover w-full h-full cursor-pointer" src={props.strMealThumb} alt={props.strMeal} />
            </div>
            <div className='mt-3 text-xl font-bold'>
                {props.strMeal}
            </div>
        </div>
    );
};

export default Card;

