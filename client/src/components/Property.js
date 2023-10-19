import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_PROPERTY } from "../utils/queries";
import { UPDATE_PROPERTY } from "../utils/mutations";

const Property = () => {
    const { loading, data } = useQuery(QUERY_PROPERTY);
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
};

export default Property;
