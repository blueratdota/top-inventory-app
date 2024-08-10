import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiChevronRight, mdiPlusCircleOutline } from "@mdi/js";

const AllCategories = ({}) => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let ignore = false;
    setIsLoading(true);
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/categories");
      const dbData = await response.json();
      if (!ignore) {
        setCategories(dbData);
        setIsLoading(false);
      }
    };
    fetchData();

    return () => {
      ignore = true;
    };
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
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
