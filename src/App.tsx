import routerConfig from '@/route';
import {RouterProvider} from 'react-router-dom';
import {QueryClientProvider} from '@tanstack/react-query';
import {queryClient} from '@util/http';
import '@/index.css';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routerConfig} />
    </QueryClientProvider>
  );
}

export default App;
