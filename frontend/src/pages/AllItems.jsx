import { useState, useEffect } from "react";
import { Link, Outlet, useOutletContext } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiChevronRight, mdiPlusCircleOutline } from "@mdi/js";

const AllItems = ({}) => {
  const context = useOutletContext();
  const items = context.items;

  if (context.isLoadingItems) {
    return <div>Loading all items...</div>;
  } else {
    return (
      <div className="p-2 max-w-[720px] mx-auto flex flex-col gap-3 [&>div]:rounded-xl">
        <div className="shadow-sm py-4 px-2 uppercase">
          <Link to={"/items/new-item"} className="flex items-center">
            <Icon path={mdiPlusCircleOutline} className="h-5 mr-4"></Icon>
            <p>Add New Item</p>
          </Link>
        </div>
        {items.map((item) => {
          return (
            <Link to={`/items/${item.item_id}`} key={item.item_id}>
              <div
                className="shadow-sm py-4 px-2 flex items-center"
                onClick={() => {
                  console.log(item);
                }}
              >
                <Icon path={mdiChevronRight} className="h-5 mr-4"></Icon>
                <div className="uppercase">{item.item_name}</div>
              </div>
            </Link>
          );
        })}
      </div>
    );
  }
};

export default AllItems;
