import { useState, useEffect } from "react";
import { Link, Outlet, useOutletContext } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiChevronRight, mdiPlusCircleOutline } from "@mdi/js";
import useSWR from "swr";

const AllCategories = ({}) => {
  const context = useOutletContext();
  const categories = context.categories;
  const setCategories = context.setCategories;

  if (context.isLoadingCategories) {
    return <div>Loading...SWR</div>;
  } else {
    return (
      <div className="p-2 max-w-[720px] mx-auto flex flex-col gap-3 [&>div]:rounded-xl">
        <div className="shadow-sm py-4 px-2 uppercase">
          <Link to={"/categories/new-category"} className="flex items-center">
            <Icon path={mdiPlusCircleOutline} className="h-5 mr-4"></Icon>
            <p>Add New Category</p>
          </Link>
        </div>
        {categories.map((category) => {
          return (
            <div
              key={category.id}
              className="shadow-sm py-4 px-2 flex items-center"
            >
              <Icon path={mdiChevronRight} className="h-5 mr-4"></Icon>
              <div className="uppercase">{category.category}</div>
            </div>
          );
        })}
      </div>
    );
  }
};

export default AllCategories;
