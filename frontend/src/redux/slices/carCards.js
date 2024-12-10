import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios.js';
import { countCollectedCars } from '../../utils/countCollectedCars.js';

const loadFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('carStatuses')) || [];
};

const saveToLocalStorage = (statuses) => {
  localStorage.setItem('carStatuses', JSON.stringify(statuses));
};

export const fetchCarCards = createAsyncThunk('car-cards/fetchCarCards', async () => {
  const { data } = await axios.get('/car-cards');
  return data;
});

const initialState = {
  cars: {
    items: [],
    status: 'loading',
    collectedCarsNumber: 0,
  },
};

const carCardSlice = createSlice({
  name: 'car-cards',
  initialState,
  reducers: {
    updateCollectionStatus(state, action) {
      const { id, newStatus } = action.payload;
      const car = state.cars.items.find((car) => car._id === id);
      if (car) {
        car.collectionStatus = newStatus;
        state.cars.collectedCarsNumber = countCollectedCars(state.cars.items);

        const savedStatuses = state.cars.items.map(({ _id, collectionStatus }) => ({
          id: _id,
          collectionStatus,
        }));
        saveToLocalStorage(savedStatuses);
      }
    },
    setCarCards(state, action) {
      state.cars.items = action.payload;
      state.cars.collectedCarsNumber = countCollectedCars(state.cars.items);
    },
    updateAllCollectionStatuses(state, action) {
      state.cars.items.forEach((car) => {
        car.collectionStatus = action.payload;
      });
      action.payload === 'collected'
        ? (state.cars.collectedCarsNumber = countCollectedCars(state.cars.items))
        : (state.cars.collectedCarsNumber = 0);

      const savedStatuses = state.cars.items.map(({ _id, collectionStatus }) => ({
        id: _id,
        collectionStatus,
      }));
      saveToLocalStorage(savedStatuses);
    },
  },
  extraReducers: (builder) => {
    // Получение и приведение в нужный вид карточек авто
    builder
      .addCase(fetchCarCards.pending, (state) => {
        state.cars.items = [];
        state.cars.status = 'loading';
      })
      .addCase(fetchCarCards.fulfilled, (state, action) => {
        const savedStatuses = loadFromLocalStorage();

        state.cars.items = action.payload.map((item, index) => {
          const savedStatus = savedStatuses.find((status) => status.id === item._id);
          return {
            ...item,
            collectionStatus: savedStatus ? savedStatus.collectionStatus : 'to-collect',
            tableNumber: index + 1,
          };
        });
        state.cars.collectedCarsNumber = countCollectedCars(state.cars.items);
        state.cars.status = 'loaded';
      })
      .addCase(fetchCarCards.rejected, (state) => {
        state.cars.items = [];
        state.cars.status = 'error';
      });
  },
});

export const { updateCollectionStatus, setCarCards, updateAllCollectionStatuses } =
  carCardSlice.actions;

export const selectCarCardsData = (state) => state.carCards;

export const carCardReducer = carCardSlice.reducer;
