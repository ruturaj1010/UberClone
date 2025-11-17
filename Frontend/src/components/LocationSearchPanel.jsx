import React from "react";

const LocationSearchPanel = ({
  suggestions,
  activeField,
  setPickUp,
  setDestination,
}) => {
  return (
    <div className="h-[70vh] overflow-y-auto flex flex-col gap-2 p-3 mt-4">
      {suggestions.length === 0 && (
        <h4 className="text-gray-400 text-center font-semibold text-lg mt-10">Type to search...</h4>
      )}

      {suggestions.map((item, i) => {
        return (
          <div
            key={i}
            onClick={() => {
              if (activeField === "pickUp") setPickUp(item.description);
              if (activeField === "destination") setDestination(item.description);
            }}
            className="border border-gray-300 active:border-black rounded-lg p-2 flex items-center gap-3 cursor-pointer"
          >
            <i className="ri-map-pin-fill text-lg h-10 w-10 rounded-full flex justify-center items-center bg-gray-200"></i>
            <h4 className="font-medium">{item.description}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;
