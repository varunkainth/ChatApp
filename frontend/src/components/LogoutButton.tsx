
import { useLogout } from "../hooks/useLogout";

export function LogoutButton() {
  const { loading, logout } = useLogout();

  return (
    <>
      {!loading ? (
        <button onClick={logout} className="btn">Logout</button>
      ) : (
        <span className="loading loading-spinner loading-sm"></span>
      )}
    </>
  );
}
