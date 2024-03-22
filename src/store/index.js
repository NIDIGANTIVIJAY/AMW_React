import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import commonReducer from "./reducer/common"
import LoginReducer from "./reducer/login";


import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 

const persistConfig = {
    key: "root",
    storage,
    blacklist: ["Common"], // Exclude 'commonReducer' from being persisted
  };

//   const persistedLoginReducer = persistReducer(persistConfig, LoginReducer);


// export default configureStore({



//     reducer:{
//         Common:commonReducer,
        
//         Login:LoginReducer
//     }
// })

const persistedReducer = persistReducer(
    persistConfig,
    combineReducers({
      Common: commonReducer,
      Login: LoginReducer,
    })
  );

  export const store = configureStore({
    reducer: persistedReducer,
  });
  
  export const persistor = persistStore(store); 