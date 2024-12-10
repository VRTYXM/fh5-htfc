import React from 'react';
import { useSelector } from 'react-redux';

const categories = ['All', 'To Collect', 'Collected'];

const dataTextForCategories = {
  All: 'all',
  'To Collect': 'to-collect',
  Collected: 'collected',
};

function Categories({ value, onChangeCategory }) {
  const { items, collectedCarsNumber } = useSelector((state) => state.carCards.cars);

  const totalCarsNumber = items.length;

  return (
    <div className="content__car-info">
      <p>
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
