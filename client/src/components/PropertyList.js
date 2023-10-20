import React from "react";
import { Button } from 'react-bootstrap';

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_PROPERTIES } from "../utils/queries";
import { UPDATE_PROPERTY } from "../utils/mutations";

import Property from "../components/Property";

import Auth from '../utils/auth';

const PropertyList = () => {
  const { loading, data } = useQuery(QUERY_PROPERTIES);
  const propertyData = data?.properties || [];
  console.log('????', data)

  const [updateProperty, { error }] = useMutation(UPDATE_PROPERTY);

  const handleUpdateProperty = async (propertyId, totalUnits) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await updateProperty({
        variables: { propertyId: propertyId, totalUnits: totalUnits },
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }
  let badkey = 0;
  return (
      <div className="property-list">
        <h2>Our Properties:</h2>
        <div className="flex-row"></div>
        {propertyData.map((property) => (
          <div key={++badkey}>
            <Property
              key={++badkey}
              name={property.name}
              address={property.address}
              unitStyles={property.unitStyles}
              totalUnits={property.totalUnits}
              image={property.image}
              reviews={property.reviews}
            />
            <Button
              key={++badkey}
              className="btn-block btn-danger"
              onClick={() =>
                handleUpdateProperty(property._id, property.totalUnits)
              }
            >
              Update this property!
            </Button>
          </div>
        ))}
      </div>
  );
};

export default PropertyList;
