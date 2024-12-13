import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import lazySizes from 'lazysizes';

import Categories from '../components/Categories';
import Search from '../components/Search';
import CarCard from '../components/CarCard';
import Skeleton from '../components/CarCard/Skeleton';

import {
  fetchCarCards,
  selectCarCardsData,
  updateAllCollectionStatuses,
} from '../redux/slices/carCards.js';
import { setCategory } from '../redux/slices/filterSlice.js';

function Home() {
  const categories = ['All', 'To Collect', 'Collected'];

  const dataTextForCategories = {
    All: 'all',
    'To Collect': 'to-collect',
    Collected: 'collected',
  };

  const dispatch = useDispatch();
  const { cars } = useSelector((state) => state.carCards);

  const category = useSelector((state) => state.filters.category);
  const activeCategory = dataTextForCategories[categories[category]];

  const areCarsLoading = cars.status === 'loading';

  const searchValue = useSelector((state) => state.filters.searchValue);

  const [isAnyCarCardVisible, setIsAnyCarCardVisible] = useState(false);

  const filteredCars =
    cars.items.length > 0
      ? cars.items.filter((car) => {
          const lowerSearch = searchValue.toLowerCase();
          const matchesSearch =
            car.fullName.toLowerCase().includes(lowerSearch) ||
            car.nickname.toLowerCase().includes(lowerSearch);
          const matchesCategory =
            activeCategory === 'all' || car.collectionStatus === activeCategory;
          return matchesSearch && matchesCategory;
        })
      : [];

  useEffect(() => {
    setIsAnyCarCardVisible(filteredCars.length > 0);
  }, [filteredCars]);

  const onChangeCategory = useCallback(
    (id) => {
      dispatch(setCategory(id));
    },
    [dispatch],
  );

  /*
  const getCarCards = async () => {
    dispatch(fetchCarCards());
  };
  */

  useEffect(() => {
    dispatch(fetchCarCards());
  }, []);
  console.log(cars);

  const onClickUpdateAll = (type) => {
    if (window.confirm(`Shall I mark ALL the cars as '${type}'?`))
      dispatch(updateAllCollectionStatuses(type));
  };

  return (
    <>
      <Categories value={category} onChangeCategory={onChangeCategory} />
      <Search />
      <div className="table-wrapper">
        <table className="car-cards">
          <thead className="car-cards__legend">
            <tr>
              <td className="number">#</td>
              <td className="photo">Photo</td>
              <td className="names">
                <tbody>
                  <tr className="fullName">Name</tr>
                  <tr className="nickname">Auction Name</tr>
                </tbody>
              </td>
              <td className="add">ADD</td>
              <td className="del">DEL</td>
            </tr>
          </thead>
          <tbody className="car-cards__table">
            {areCarsLoading
              ? [...Array(10)].map((_, index) => <Skeleton key={index} />)
              : filteredCars.map((obj) => (
                  <CarCard
                    tableNumber={obj.tableNumber}
                    key={obj._id}
                    id={obj._id}
                    fullName={obj.fullName}
                    nickname={obj.nickname}
                    photo={obj.photo}
                    wikiLink={obj.wikiLink}
                    collectionStatus={obj.collectionStatus}
                    activeCategory={activeCategory}
                  />
                ))}
            {!isAnyCarCardVisible && (
              <tr className="not-found">
                <td className="number">—</td>
                <td className="photo">
                  <div className="not-found">XXX</div>
                </td>
                <td className="names">
                  <div className="not-found not-found-wide">
                    Sorry, no cars found <span>🤔</span>
                  </div>
                  <div className="not-found not-found-thin">— — —</div>
                </td>
                <td className="add">
                  <div className="not-found not-found-button">XXX</div>
                </td>
                <td className="del">
                  <div className="not-found not-found-button">XXX</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="additional-buttons">
          <button onClick={() => onClickUpdateAll('collected')} className="add-all">
            Add All
          </button>
          <button onClick={() => onClickUpdateAll('to-collect')} className="delete-all">
            Delete All
          </button>
        </div>
      </div>
      <div className="main-footer">
        <div className="about">
          <h2>FORZA HORIZON 5 — YOUR HARD-TO-FIND COLLECTOR ASSISTANT</h2>
          <p>
            Forza Horizon 5 lacks a convenient interface for tracking cars or using bookmarks to
            search the Auction, making it challenging to complete a collection of rare cars. You end
            up spending more time checking which cars you need than actually finding them.
            <br />
            <br /> This companion web app is here to save your time and effort. How can it help?
            <br />
            <br />
            <ul className="about__pros">
              <li id="tab-system">
                <b>Tab System</b> — it lets you mark cars you already own, allowing you to focus
                only on the list of missing ones.
              </li>
              <li id="photos">
                <b>Photos</b> — by regularly working with the table, you'll remember what the cars
                you need look like, so you can spot a great deal on the Auction in time.
              </li>
              <li id="two-names">
                <b>Two Names</b> — the top name (full name) helps you locate the car in the auction
                lot list. The lower name (nickname) helps you quickly find the model you need using
                filters.
              </li>
            </ul>
          </p>
        </div>
        <div className="main-footer__delimiter"></div>
        <div className="feedback">
          <h3>Contact Me</h3>
          <div className="link-block">
            <div className="link-icon-wrapper">
              <svg
                className="mail-icon icon"
                viewBox="0 0 192 192"
                xmlns="http://www.w3.org/2000/svg"
                fill="none">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    stroke="#ffffff"
                    stroke-linejoin="round"
                    stroke-width="12"
                    d="M22 57.265V142c0 5.523 4.477 10 10 10h24V95.056l40 30.278 40-30.278V152h24c5.523 0 10-4.477 10-10V57.265c0-13.233-15.15-20.746-25.684-12.736L96 81.265 47.684 44.53C37.15 36.519 22 44.032 22 57.265Z"></path>
                </g>
              </svg>
            </div>
            <div className="link-icon-wrapper">
              <svg
                className="steam-icon icon"
                fill="#ffffff"
                viewBox="0 0 32 32"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  {' '}
                  <title>steam</title>{' '}
                  <path d="M18.102 12.129c0-0 0-0 0-0.001 0-1.564 1.268-2.831 2.831-2.831s2.831 1.268 2.831 2.831c0 1.564-1.267 2.831-2.831 2.831-0 0-0 0-0.001 0h0c-0 0-0 0-0.001 0-1.563 0-2.83-1.267-2.83-2.83 0-0 0-0 0-0.001v0zM24.691 12.135c0-2.081-1.687-3.768-3.768-3.768s-3.768 1.687-3.768 3.768c0 2.081 1.687 3.768 3.768 3.768v0c2.080-0.003 3.765-1.688 3.768-3.767v-0zM10.427 23.76l-1.841-0.762c0.524 1.078 1.611 1.808 2.868 1.808 1.317 0 2.448-0.801 2.93-1.943l0.008-0.021c0.155-0.362 0.246-0.784 0.246-1.226 0-1.757-1.424-3.181-3.181-3.181-0.405 0-0.792 0.076-1.148 0.213l0.022-0.007 1.903 0.787c0.852 0.364 1.439 1.196 1.439 2.164 0 1.296-1.051 2.347-2.347 2.347-0.324 0-0.632-0.066-0.913-0.184l0.015 0.006zM15.974 1.004c-7.857 0.001-14.301 6.046-14.938 13.738l-0.004 0.054 8.038 3.322c0.668-0.462 1.495-0.737 2.387-0.737 0.001 0 0.002 0 0.002 0h-0c0.079 0 0.156 0.005 0.235 0.008l3.575-5.176v-0.074c0.003-3.12 2.533-5.648 5.653-5.648 3.122 0 5.653 2.531 5.653 5.653s-2.531 5.653-5.653 5.653h-0.131l-5.094 3.638c0 0.065 0.005 0.131 0.005 0.199 0 0.001 0 0.002 0 0.003 0 2.342-1.899 4.241-4.241 4.241-2.047 0-3.756-1.451-4.153-3.38l-0.005-0.027-5.755-2.383c1.841 6.345 7.601 10.905 14.425 10.905 8.281 0 14.994-6.713 14.994-14.994s-6.713-14.994-14.994-14.994c-0 0-0.001 0-0.001 0h0z"></path>{' '}
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
