import React from 'react';

const Skeleton = () => {
  return (
    <tr>
      <td className="number">———</td>
      <td className="photo">
        <div className="placeholder placeholder-image"></div>
      </td>
      <td className="names">
        <div className="placeholder placeholder-wide"></div>
        <div className="placeholder placeholder-thin"></div>
      </td>
      <td className="add">
        <div className="placeholder placeholder-button"></div>
      </td>
      <td className="del">
        <div className="placeholder placeholder-button"></div>
      </td>
    </tr>
  );
};

export default Skeleton;
