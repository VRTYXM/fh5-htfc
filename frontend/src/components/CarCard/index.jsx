import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { updateCollectionStatus } from '../../redux/slices/carCards';

const REACT_APP_API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4444';

const CarCard = ({
  tableNumber,
  key,
  id,
  fullName,
  nickname,
  photo,
  wikiLink,
  collectionStatus,
}) => {
  const classRef = useRef();
  const dispatch = useDispatch();

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
    <tr ref={classRef} className={collectionStatus}>
      <td className="number">{tableNumber}</td>
      <td className="photo">
        <a href={wikiLink} target="_blank" title={`${fullName} page on Forza Wiki`}>
          <img
            className="lazyload"
            data-src={photo ? `${REACT_APP_API_URL}/uploads/cars/${photo}` : ''}
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
