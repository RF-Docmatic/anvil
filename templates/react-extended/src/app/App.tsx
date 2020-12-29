import React, { Suspense } from "react";

const InitialScreen = React.lazy(
  () => import("../features/initial/InitialScreen")
);

const App: React.FC = () => (
  <div>
    <Suspense fallback={<h1>Loading...</h1>}>
      <InitialScreen />
    </Suspense>
  </div>
);

export default App;
