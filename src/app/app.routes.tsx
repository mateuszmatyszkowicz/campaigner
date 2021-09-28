import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Spinner } from "../+shared/components/spinner/spinner.component";
import { persistor, store } from "./app.store";

export const AppRoutes = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Spinner />} persistor={persistor}>
        <Router>
          <Route path={"/"} exact render={() => <div>Main <Spinner /></div>} />
        </Router>
      </PersistGate>
    </Provider>
  );
};
