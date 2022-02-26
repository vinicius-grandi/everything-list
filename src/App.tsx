import React, { useEffect, useState } from 'react';
import OneSignal from 'react-onesignal';
import * as api from './services/jikanapi';

function App() {
  const [subscription, setSubscription] = useState(false);
  useEffect(() => {
    OneSignal.getSubscription().then(
      (res) => setSubscription(res),
    );
    api.getSchedule(7).then((r) => console.log(r));
  }, []);
  return (
    <div className="App">
      <h1>Sample Text</h1>
      {subscription && (
        <button
          type="button"
          // onClick={() => OneSignal.sendTag()}
        >
          Send Tag
        </button>
      )}
    </div>
  );
}

export default App;
