import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import ListingPageContainer from "../ListingPage/ListingPageContainer/ListingPageContainer";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <ListingPageContainer />
  </StrictMode>
);
