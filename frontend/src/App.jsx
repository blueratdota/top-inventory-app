import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import useSWR from "swr";

function App() {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let ignore = false;
    setIsLoading(true);
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/api/users/profile", {
        credentials: "include"
      });
      const dbData = await response.json();
      if (!ignore) {
        setUserData(dbData);
        setIsLoading(false);
      }
    };
    fetchData();

    return () => {
      ignore = true;
    };
  }, []);

  // SWR FETCH STUFF
  const fetcher = (...url) => fetch(...url).then((res) => res.json());
  const {
    data: items,
    error: errorItems,
    isLoading: isLoadingItems
  } = useSWR("http://localhost:3000", fetcher, { revalidateOnFocus: false });
  const {
    data: categories,
    error: errorcategories,
    isLoading: isLoadingCategories
  } = useSWR("http://localhost:3000/categories", fetcher, {
    revalidateOnFocus: false
  });

  return (
    <>
      <header className="bg-orange-500 text-extWhite  md:flex justify-between items-center px-5 py-3">
        <h1 className="text-3xl font-semibold mb-5 text-center">
          <Link to={"/"}>Odin Inventory App</Link>
        </h1>
        <nav className="flex justify-center gap-5 mx-auto">
          <Link to={"/items"}>
            <div>All Items</div>
          </Link>
          <Link to={"/categories"}>
            <div>All Catetgories</div>
          </Link>
          <Link to={"/admin"}>
            <div>Admin</div>
          </Link>
        </nav>
      </header>
      {isLoading ? (
        <div>Loading main app...</div>
      ) : (
        <div>
          <Outlet
            context={{
              userData: userData,
              setUserData: setUserData,
              items: items,
              // setItems: setItems,
              categories: categories,
              // setCategories: setCategories,
              isLoadingItems: isLoadingItems,
              isLoadingCategories: isLoadingCategories
            }}
          ></Outlet>
        </div>
      )}
    </>
  );
}

export default App;
