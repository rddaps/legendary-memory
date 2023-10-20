import React from "react";
import { useQuery } from "@apollo/client";

import PropertyList from "../components/PropertyList";

import { QUERY_PROPERTIES } from "../utils/queries";

const Homepage = () => {
  const { loading, data } = useQuery(QUERY_PROPERTIES);
  const properties = data?.properties || [];

  return (
    // <div class="property-list">
    //       </div>
    <main>
      <div className="flex-row justify-center">
        <div
          className="flex-row justify-center"
          style={{ border: "1px dashed #A7DBD5" }}
        >
          <PropertyList />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <PropertyList
              properties={properties}
              title="Check out our offerings..."
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Homepage;
