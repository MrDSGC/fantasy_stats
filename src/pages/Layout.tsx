import { Outlet, Link } from "react-router-dom";

type Props = {
  getAuth: any;
  authToken: any;
};

const Layout = ({ getAuth, authToken }: Props) => {
  const layoutContainerStyle = {
    display: "flex",
  };

  const verticalNavStyle = {
    width: "200px",
    backgroundColor: "#f0f0f0",
    padding: "20px",
    boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
  };

  const ulStyle = {
    listStyleType: "none",
    padding: "0",
    margin: "0",
  };

  const liStyle = {
    marginBottom: "10px",
  };

  const contentStyle = {
    flexGrow: 1,
    padding: "20px",
  };

  return (
    <div style={layoutContainerStyle}>
      <nav style={verticalNavStyle}>
        <button onClick={() => getAuth()}>GET_AUTH</button>
        <div>
          <span>Currently:</span>{" "}
          {authToken ? <span>Authorized</span> : <span>Not Authorized</span>}
        </div>
        <ul style={ulStyle}>
          <li style={liStyle}>
            <Link to="/">Home</Link>
          </li>
          <li style={liStyle}>
            <Link to="/auth">Auth</Link>
          </li>
          <li style={liStyle}>
            <Link to="/fbb">FBB</Link>
          </li>
        </ul>
      </nav>

      <div style={contentStyle}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
