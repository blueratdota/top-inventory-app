import { useOutletContext } from "react-router-dom";
import { useState } from "react";

const Home = ({}) => {
  const context = useOutletContext();
  const [isLoading, setIsLoading] = useState(false);
  const loginData = context.userData;

  return (
    <div className="py-4 px-2">
      <h1 className="text-2xl mb-4">
        Hello{" "}
        <span className="font-bold">
          {loginData.username ? loginData.username : "visitor"}
        </span>
        !
      </h1>
      {loginData.username ? (
        <>
          <p>
            Thank you for taking time to create an account! You are eligible to
            perform all of the following actions on this app:
          </p>
          <ul className="indent-2">
            <li>Delete categories</li>
            <li>Delete items</li>
            <li>Create a category</li>
            <li>Create an item</li>
            <li>Increase/decrease an item's quantity</li>
          </ul>
        </>
      ) : (
        <>
          <p>
            You are not currently logged in to an account. You will not be able
            to use the following actions:
          </p>
          <ul className="indent-2 mb-2">
            <li>Delete categories</li>
            <li>Delete items</li>
          </ul>
          <p>You are only allowed to do the following actions:</p>
          <ul className="indent-2 mb-2">
            <li>Create a category</li>
            <li>Create an item</li>
            <li>Increase/decrease an item's quantity</li>
          </ul>
          <p className="mt-4">
            You can try and login using the following accounts:
          </p>
          <p>Admin Account </p>
          <p>
            Username & Password: <span className="font-bold">admin</span>{" "}
          </p>
          <p>Regular User Account </p>
          <p>
            Username & Password: <span className="font-bold">user</span>{" "}
          </p>
        </>
      )}
    </div>
  );
};
export default Home;
