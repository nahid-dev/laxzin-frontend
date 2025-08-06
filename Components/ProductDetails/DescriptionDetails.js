import React from 'react'
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import ReactStars from "react-rating-stars-component";


const DescriptionDetails = ({data}) => {
 


  return (
    <div className=" w-full rounded-md  mb-5 mt-4 ">
      <Tabs>
        <div className="tab">
          <TabList>
            <Tab>
              {" "}
              <span className="text-black">Description</span>
            </Tab>
            <Tab>
              {" "}
              <span className="text-black">Guideline</span>{" "}
            </Tab>
            <Tab>
              {" "}
              <span className="text-black">How to use</span>{" "}
            </Tab>
            <Tab>
              {" "}
              <span className="text-black">Ingredient</span>{" "}
            </Tab>
            <Tab>
              {" "}
              <span className="text-black">Reviews</span>{" "}
            </Tab>
          </TabList>
        </div>

        <TabPanel>
          <div className="pt-3">
            <span
              className="text-black description"
              dangerouslySetInnerHTML={{ __html: data?.description }}
            ></span>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="pt-3">
            <span
              className="text-black"
              dangerouslySetInnerHTML={{ __html: data?.guide_line }}
            ></span>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="pt-3">
            <span
              className="text-black"
              dangerouslySetInnerHTML={{ __html: data?.benefits }}
            ></span>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="pt-3">
            <span
              className="text-black"
              dangerouslySetInnerHTML={{ __html: data?.ingredient }}
            ></span>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="overflow-hidden pt-3">
            {data?.reviews?.length > 0 ? (
              <>
                {data?.reviews.map((rev, idx) => (
                  <div key={idx} className="border-b py-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <div className="text-[12px] text-gray-600">Rating:</div>
                        <div>
                          <ReactStars
                            count={5}
                            value={rev?.star}
                            edit={false}
                            size={20}
                            activeColor="#ffd700"
                          />
                        </div>
                        <div className="text-[12px] text-gray-600">
                          ({rev?.user?.name})
                        </div>
                      </div>
                      <div className="text-[12px] text-gray-600">
                        {rev?.review_date}
                      </div>
                    </div>
                    <div className="text-[12px] font-semibold">
                      {" "}
                      {rev?.description}
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <span className="text-black">NO reviews yet</span>
            )}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default DescriptionDetails