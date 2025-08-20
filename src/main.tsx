import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import './satoshi.css';
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// import { PersistGate } from 'redux-persist/es/integration/react';
import { store } from './redux/store';


export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 5 * 60 * 1000,
      staleTime: 0,
      refetchOnWindowFocus: true,
      retry: 1,
    },
  },
})

// persistor.purge()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <Provider store={store} >
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </Provider>
      </QueryClientProvider>
    </Router>
  </React.StrictMode>
);
