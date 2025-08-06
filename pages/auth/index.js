

import Login from "@/Components/Auth/Login";
import Register from "@/Components/Auth/Register";
import { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

const Auth = () => {
  
    const [tabIndex,setTabIndex] = useState(1);

  return (
    <div className="min-h-screen bg-gray-100 pb-10  flex items-center justify-center ">
      <div className=" bg-white xs:w-[450px] w-[350px] mx-auto rounded-md font-jost">
        {tabIndex == 0 ? (
          <div className="py-4 text-2xl text-center tracking-wide  font-bold capitalize  text-black mb-3 pl-3 relative">
            User registration
            
          </div>
        ) : (
          <div className="py-4 text-2xl text-center tracking-wide font-bold capitalize text-black mb-3 pl-3 relative">
            Login
            
          </div>
        )}

        <Tabs
          className="w-full"
          selectedIndex={tabIndex}
          onSelect={(index) => setTabIndex(index)}
        >
          <TabList className="py-2 px-10 grid grid-cols-2 w-full">
            <Tab selectedClassName="react-tabs__tab--selected">
              <span className="flex justify-center tracking-wide text-lg cursor-pointer dark:text-black">
                Register
              </span>
            </Tab>
            <Tab selectedClassName="react-tabs__tab--selected">
              <span className="flex justify-center tracking-wide text-lg cursor-pointer dark:text-black">
                Login
              </span>
            </Tab>
          </TabList>
          <div className="px-4">
            <TabPanel>
              <Register />
            </TabPanel>
            <TabPanel>
              <Login />
            </TabPanel>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;
