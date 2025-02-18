import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { appStore } from "./app/store";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import { useLoadUserProfileQuery } from "./features/api/authApi";
import LoadingSpinner from "./components/LoadingSpinner";

const Custom = ({ children }) => {
  const { isLoading } = useLoadUserProfileQuery();
  return (
    <>
      {isLoading ? (
          <LoadingSpinner></LoadingSpinner>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

createRoot(document.getElementById("root")).render(
  
    <Provider store={appStore}>
      <Custom>
        <App /> {/* Here app component acts as the children prop passed to Custom component.*/}
        <Toaster></Toaster>
      </Custom>
      
    </Provider>
 
);
