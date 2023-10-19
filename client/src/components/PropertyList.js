import React, { useEffect } from 'react';
import { UPDATE_PROPERTY } from '../../utils/mutations';
import { useQuery } from '@apollo/client';
import { QUERY_PROPERTIES } from '../../utils/queries';

function PropertyList() {  
    const { loading, data } = useQuery(QUERY_PROPERTIES);





  return (
    <div className="property-list">
      <h2>Properties</h2>
        {properties.map((property) => (
                <div key={property._id} className="property">
                <h3>{property.name}</h3>
                <p>Address: {property.address}</p>
                <p>unitStyles: {property.unitStyles}</p>
                <p>totalUnits: {property.totalUnits}</p>
                <p>image: { }</p>
                <h4>Reviews</h4>
        )}
    </div>
  );
};

export default PropertyList;
