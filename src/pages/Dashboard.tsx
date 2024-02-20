import {redirect} from 'react-router-dom';
import {limitCheckLogin} from '../util/login';

const Dashboard = () => {
  return (
    <main className='pt-12'>
      <div>Dashborad page</div>
    </main>
  );
};

export default Dashboard;

// eslint-disable-next-line react-refresh/only-export-components
export const loader = () => {
  const path = limitCheckLogin('dashboard');
  if (path) return redirect(path);
  return path;
};
