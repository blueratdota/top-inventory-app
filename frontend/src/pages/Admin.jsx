import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Login from "./Login";
import { useNavigate } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiCloseCircleOutline } from "@mdi/js";
import { useSWRConfig } from "swr";

const Admin = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { mutate } = useSWRConfig();
  const context = useOutletContext();
  const loginData = context.userData;
  const items = context.items;
  const categories = context.categories;

  const logOutUser = async () => {
    const logout = await fetch("http://localhost:3000/api/users/logout", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" }
    });
    context.setUserData([]);
    navigate("/admin");
  };

  const deleteItem = async (id) => {
    const toDelete = await fetch(`http://localhost:3000/items/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    });
    mutate("http://localhost:3000/items");
  };
  const deleteCategory = async (id) => {
    const toDelete = await fetch(`http://localhost:3000/categories/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    });
    mutate("http://localhost:3000/categories");
  };

  // ####################### THINGS TO DO HERE
  // MAKE A CONFIRMATION MODAL FOR DELETING ITEM/CATEGORY
  // WHEN DELETING A CATEGORY, ALSO DELETE ALL ITEMS THAT ARE IN THAT CATEGORY, MODIFY THE BACKEND CODE

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        {loginData.username ? (
          <>
            <div className="flex items-center justify-between my-5 px-4">
              <p>
                You are currently logged in as{" "}
                <span className="font-bold">{loginData.username}</span>
              </p>
              <div className="pl-4">
                <button
                  onClick={logOutUser}
                  className="py-2 mx-auto w-40 md:w-80 rounded-lg bg-orange-500 text-white"
                >
                  log out
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-5 md:flex-row">
              <div className="basis-1/2">
                <>
                  {context.isLoadingItems ? (
                    <div>Loading items...</div>
                  ) : (
                    <>
                      {items.map((item) => {
                        return (
                          <div
                            key={item.id}
                            className="border rounded-lg mt-2 mx-2 p-2 pl-4 flex justify-between items-center"
                          >
                            <div>{item.item_name}</div>
                            <Icon
                              onClick={() => {
                                deleteItem(item.item_id);
                              }}
                              path={mdiCloseCircleOutline}
                              className="h-5 mr-4 text-red-600"
                            ></Icon>
                          </div>
                        );
                      })}
                    </>
                  )}
                </>
              </div>
              <div className="basis-1/2">
                <>
                  {context.isLoadingCategories ? (
                    <div>Loading categories...</div>
                  ) : (
                    <>
                      {categories.map((category) => {
                        return (
                          <div
                            key={category.id}
                            className="border rounded-lg mt-2 mx-2 p-2 pl-4 flex justify-between items-center"
                          >
                            <div>{category.category}</div>
                            <Icon
                              onClick={() => {
                                deleteCategory(category.category);
                              }}
                              path={mdiCloseCircleOutline}
                              className="h-5 mr-4 text-red-600"
                            ></Icon>
                          </div>
                        );
                      })}
                    </>
                  )}
                </>
              </div>
            </div>
          </>
        ) : (
          <Login isLoading={isLoading} setIsLoading={setIsLoading}></Login>
        )}
      </div>
    );
  }
};
export default Admin;
