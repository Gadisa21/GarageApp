import createWebStorage from "redux-persist/lib/storage/createWebStorage";


const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem() {
      return Promise.resolve();
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

// Check if window is defined (i.e., we are in the browser)
const storage = typeof window !== "undefined" ? createWebStorage("session") : createNoopStorage();

export default storage;




// {
//   "employee_email": "update@gmail.com",
//    "employee_password": "8HYsy&^uud*7hh"
// }