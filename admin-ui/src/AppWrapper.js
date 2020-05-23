import React from "react";

import { Store } from "./store";
import App from "./App";

const AppWrapper = () => {
  return (
    <Store>
      <App />
    </Store>
  );
};

export default AppWrapper;
