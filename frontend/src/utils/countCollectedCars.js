export const countCollectedCars = (items) => {
  return items.reduce((sum, obj) => {
    return sum + (obj.collectionStatus === 'collected' ? 1 : 0);
  }, 0);
};
