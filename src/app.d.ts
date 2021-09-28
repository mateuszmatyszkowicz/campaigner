/// <reference types="react-scripts" />

import { composeWithDevTools } from "@reduxjs/toolkit/dist/devtoolsExtension";

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof composeWithDevTools;
    }
}
