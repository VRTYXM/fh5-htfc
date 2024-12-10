import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { updateCollectionStatus } from '../../redux/slices/carCards';

const CarCard = ({
  tableNumber,
  key,
  id,
  fullName,
  nickname,
  photo,
  wikiLink,
  collectionStatus,
  activeCategory,
}) => {
  const classRef = useRef();
  const dispatch = useDispatch();

  const isVisible = activeCategory === 'all' || collectionStatus === activeCategory;

  const handleSetCollected = () => {
    if (classRef.current) {
      classRef.current.classList.add('collected');
      classRef.current.classList.remove('to-collect');
      dispatch(updateCollectionStatus({ id, newStatus: 'collected' }));
    }
  };

  const handleSetToCollect = () => {
    if (classRef.current) {
      classRef.current.classList.add('to-collect');
      classRef.current.classList.remove('collected');
      dispatch(updateCollectionStatus({ id, newStatus: 'to-collect' }));
    }
  };

  return (
    <tr
      ref={classRef}
      className={collectionStatus}
      style={{ display: isVisible ? 'table-row' : 'none' }}>
      <td className="number">{tableNumber}</td>
      <td className="photo">
        <a href={wikiLink}>
          <img
            className="lazyload"
            data-src={photo ? `http://localhost:4444/uploads/cars/${photo}` : ''}
            alt={fullName}
          />
        </a>
      </td>
      <td className="names">
        <tr className="fullName">{fullName}</tr>
        <tr className="nickname">{nickname}</tr>
      </td>
      <td className="add">
        <button onClick={handleSetCollected}>ADD</button>
      </td>
      <td className="del">
        <button onClick={handleSetToCollect}>DEL</button>
      </td>
    </tr>
  );
};

export default CarCard;
