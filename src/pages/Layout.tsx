import { Outlet, Link } from "react-router-dom";

const Layout = ({getAuth}: {getAuth: any}) => {
  return (
    <>
      <nav>
        <button onClick={() => getAuth()}>
          GET_AUTH
        </button>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/auth">Auth</Link>
          </li>
          <li>
            <Link to="/fbb">FBB</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;