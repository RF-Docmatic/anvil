import React, { Suspense } from "react";

import { InitialScreen as NamedInitialScreen } from "../features/initial/components";

const InitialScreen = React.lazy(() => import("../features/initial/components/InitialScreen"));

const App: React.FC = () => (
  <div>
    {/* <Suspense fallback={<h1>Loading...</h1>}>
      <InitialScreen />
    </Suspense> */}
    <NamedInitialScreen />
  </div>
);

export default App;
