import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

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
      <div className="grid grid-cols-3 gap-5 py-5 max-w-[720px] mx-auto">
        {categories.map((category) => {
          return (
            <div key={category.id} className="border">
              <div className="uppercase">{category.category}</div>
            </div>
          );
        })}
        <div className="border">
          {" "}
          <Link to={"/categories/new-category"}>Add Item</Link>
        </div>
      </div>
    );
  }
};

export default AllCategories;
