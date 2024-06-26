import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu";
import UserIcon from "../assets/icons/UserIcon";
import { Button } from "./ui/Button";

export default function Header() {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="h-10 flex items-center ps-8 pr-2 justify-between absolute z-10 top-4 left-1/2 -translate-x-1/2 shadow-md bg-white rounded-full w-4/5 lg:w-2/3 xl:w-1/2">
      <Link
        to={"/"}
        className="uppercase text-2xl tracking-wide font-light text-teal-700 mr-8"
      >
        Karma
      </Link>
      {/* Show how menu on large screeens */}
      <div className="hidden sm:flex flex-1 items-center justify-between text-slate-800 h-full">
        <div className="flex gap-6 md:gap-8">
          <Link
            to={"/"}
            className="transition text-slate-600 hover:text-teal-700"
          >
            Activities
          </Link>
          {user?.role === "volunteer" && (
            <Link
              to={"/prizes"}
              className="transition text-slate-600 hover:text-teal-700"
            >
              Prizes
            </Link>
          )}
          {user?.role === "admin" && (
            <Link
              to={"/organizations"}
              className="transition text-slate-600 hover:text-teal-700"
            >
              Organizations
            </Link>
          )}
          {user?.role === "organizer" && (
            <>
              <Link
                to={`/organizations/${user?.organizationId}`}
                className="transition text-slate-600 hover:text-teal-700"
              >
                My Organization
              </Link>

              {user?.organizationId && (
                <>
                  <Link
                    to={`/organizations/${user?.organizationId}/volunteers`}
                    className="transition text-slate-600 hover:text-teal-700"
                  >
                    Volunteers
                  </Link>
                  <Link
                    to={`/organizations/${user?.organizationId}/prizes`}
                    className="transition text-slate-600 hover:text-teal-700"
                  >
                    Prizes
                  </Link>
                </>
              )}
            </>
          )}
        </div>

        <div className="space-x-4 h-2/3 flex justify-center items-center">
          {!user ? (
            <>
              <Link
                to={"login"}
                className="transition-all h-full px-4 border-2 rounded-md border-teal-700 text-teal-700 font-semibold flex items-center hover:bg-teal-50 "
              >
                <p className="">Log in</p>
              </Link>
              <Link
                to={"/signup"}
                className="transition-all h-full px-4 rounded-md bg-teal-700 text-white font-semibold flex items-center hover:bg-teal-800 active:bg-teal-900"
              >
                <p className="">Sign up</p>
              </Link>
            </>
          ) : (
            <div className="flex items-center space-x-2 uppercase text-sm text-teal-700 font-bold">
              <p>{user.role}</p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={"link"} className="px-3 py-1 rounded-full">
                    <UserIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {user?.role === "volunteer" && (
                    <>
                      <DropdownMenuItem onClick={() => navigate("/users/me")}>
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  <DropdownMenuItem
                    onClick={() => {
                      logout();
                      navigate("/");
                    }}
                  >
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </div>

      {/* Show hamburger on small screeens */}
      {!isMenuOpen && (
        <div
          className="sm:hidden cursor-pointer"
          onClick={() => setMenuOpen(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </div>
      )}

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="transition-all flex flex-col items-start absolute right-0 top-0 w-52 h-full sm:hidden bg-slate-50 z-10 p-6 gap-4">
          <div className="flex flex-col items-start gap-4 w-full">
            {!user ? (
              <>
                <div className="w-full flex justify-between">
                  <Link
                    to={"/login"}
                    className="transition text-slate-600 hover:text-teal-700 flex items-center space-x-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                    </svg>
                    <p className="-translate-y-0.5">Log in</p>
                  </Link>
                  <button onClick={() => setMenuOpen(false)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <Link
                  to={"/signup"}
                  className="transition text-slate-600 hover:text-teal-700 flex items-center space-x-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  <p className="-translate-y-0.5">Sign up</p>
                </Link>
              </>
            ) : (
              <div className="w-full flex justify-between">
                <button
                  onClick={logout}
                  className="transition text-slate-600 hover:text-teal-700 flex items-center space-x-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                    />
                  </svg>
                  <p>Logout</p>
                </button>
                <button onClick={() => setMenuOpen(false)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          <div className="w-full border-b-2"></div>

          <Link
            to={"/activities"}
            className="transition text-slate-600 hover:text-teal-700 hover:translate-x-1"
          >
            Activities
          </Link>
          <Link
            to={"/organizations"}
            className="transition text-slate-600 hover:text-teal-700 hover:translate-x-1"
          >
            Organizations
          </Link>

          {user?.organizationId && (
            <Link
              to={`/organizations/${user?.organizationId}`}
              className="transition text-slate-600 hover:text-teal-700 hover:translate-x-1"
            >
              My Organization
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
