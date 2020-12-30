import React, { Suspense } from "react";
import { Spin } from "antd";

const InitialScreen = React.lazy(() => import("../features/initial/components/InitialScreen"));

const App: React.FC = () => (
  <div>
    <Suspense fallback={<Spin tip="Loading..." />}>
      <InitialScreen />
    </Suspense>
  </div>
);

export default App;
