import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

const Dashboard = () => {
  return (
    <>
      <h3>Dashboard</h3>
      <button onClick={() => signOut(auth)}>Logout</button>
    </>
  );
};

export default Dashboard;
