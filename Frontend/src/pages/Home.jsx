import React from "react";

const Home = () => {
  return (
    <div className="relative">
      <img
        className="w-16 absolute top-4 left-4 z-10"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/1280px-Uber_logo_2018.png"
        alt="img"
      />
      <div className="h-screen w-screen">
        {/* {image for temporary use} */}
        <img
          className="h-full w-full object-cover"
          src="https://media.geeksforgeeks.org/wp-content/uploads/20220218205322/WhatsAppImage20220218at54912PM-304x660.jpeg"
          alt="map img"
        />
      </div>

      <div className="bg-white h-screen absolute bottom-0 w-full p-5 z-20">
        <div className="h-[28%]">
          <h4 className="text-3xl font-semibold">Find a trip</h4>
          <form action="">
            <input
              className="bg-[#eee] w-full text-base font-medium px-6 py-1 rounded-lg my-2 outline-none"
              type="text"
              name="pickup"
              id="pickup"
              placeholder="Add a pick-up location"
            />
            <input
              className="bg-[#eee] w-full text-base font-medium px-6 py-1 rounded-lg outline-none"
              type="text"
              name="dest"
              id="dest"
              placeholder="Enter a destination"
            />
          </form>
        </div>

        <div className="h-[72%] bg-amber-500"></div>
      </div>
    </div>
  );
};

export default Home;
