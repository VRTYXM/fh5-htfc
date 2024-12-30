import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const categories = ['All', 'To Collect', 'Collected'];

const dataTextForCategories = {
  All: 'all',
  'To Collect': 'to-collect',
  Collected: 'collected',
};

function Categories({ value, onChangeCategory }) {
  const counterRef = useRef(null);
  const { items, collectedCarsNumber } = useSelector((state) => state.carCards.cars);

  const totalCarsNumber = items.length;

  useEffect(() => {
    if (totalCarsNumber > 0) {
      const varComponent = 255 - 255 * (collectedCarsNumber / totalCarsNumber);

      if (varComponent === 0) {
        counterRef.current.style.color = 'rgb(255,215,0)';
      } else {
        const newColor = `rgb(${varComponent},255,${varComponent})`;
        counterRef.current.style.color = newColor;
      }
    } else {
      counterRef.current.style.color = 'rgb(255,255,255)';
    }
  }, [collectedCarsNumber, totalCarsNumber]);

  return (
    <div className="content__car-info">
      <p ref={counterRef} className="car-counter">
        {collectedCarsNumber} / {totalCarsNumber}
      </p>
      <ul className="categories">
        {categories.map((categoryName, index) => (
          <li
            key={index}
            data-text={dataTextForCategories[categoryName]}
            onClick={() => onChangeCategory(index)}
            className={value === index ? 'active' : ''}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
