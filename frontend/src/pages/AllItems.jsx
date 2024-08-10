import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiChevronRight, mdiPlusCircleOutline } from "@mdi/js";

const AllItems = ({}) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let ignore = false;
    setIsLoading(true);
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/");
      const dbData = await response.json();
      if (!ignore) {
        setItems(dbData);
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
          <Link to={"/items/new-items"} className="flex items-center">
            <Icon path={mdiPlusCircleOutline} className="h-5 mr-4"></Icon>
            <p>Add New Item</p>
          </Link>
        </div>
        {items.map((item) => {
          return (
            <div
              key={item.id}
              className="shadow-sm py-4 px-2 flex items-center"
              onClick={() => {
                console.log(item);
              }}
            >
              <div>Name: {item.item_name}</div>
              <div>Category: {item.item_category}</div>
              <div>Quantity: {item.item_qty}</div>
            </div>
          );
        })}
      </div>
    );
  }
};

export default AllItems;
