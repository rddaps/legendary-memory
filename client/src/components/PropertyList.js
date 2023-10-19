import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_PROPERTIES } from "../utils/queries";
import { UPDATE_PROPERTY } from "../utils/mutations";

const PropertyList = () => {
  const { loading, data } = useQuery(QUERY_PROPERTIES);
  const propertyData = data?.property || [];

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

  if (!loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div className="property-list">
        <h2>Our Properties:</h2>
        <div className="flex-row"></div>
        {propertyData.PropertyList.map((property) => (
          <>
            <Property
              key={property._id}
              _id={property._id}
              name={property.name}
              address={property.address}
              unitStyles={property.unitStyles}
              totalUnits={property.totalUnits}
              image={property.image}
            />
            <Button
              className="btn-block btn-danger"
              onClick={() =>
                handleUpdateProperty(property._id, property.totalUnits)
              }
            >
              Update this property!
            </Button>
          </>
        ))}
      </div>
    </>
  );
};

export default PropertyList;
