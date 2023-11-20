import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo.png";
import useRequest from "@/hooks/use-request";
import Router from "next/router";

const NavBar = ({ links, btns }) => {
  const { doRequest, errors } = useRequest({
    url: "/api/users/signout",
    body: {},
    method: "post",
    onSuccess: () => Router.push("/"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    doRequest();
    console.log(errors);
  };
  return (
    <nav className="flex justify-center py-4 px-2 absolute w-full">
      <div className="container flex justify-between items-center">
        <Link className="flex gap-2 items-center mr-20" href="/">
          <Image src={logo} alt="logo" width={40} />
          <h1 className="font-semibold text-secondary">Hirafee</h1>
        </Link>

        <ul className="flex gap-6 hidden sm:flex">
          {links.map((link) => {
            return (
              <Link
                className="text-accent hover:text-secondary text-md font-normal"
                key={link.href}
                href={link.href}
                alt={link.label}
              >
                {link.label}
              </Link>
            );
          })}
        </ul>
        <div className=" gap-2 hidden sm:flex">
          {btns.map((btn) => {
            if (btn.type === "link") {
              return (
                <Link
                  key={btn.href}
                  className={btn.className}
                  href={btn.href}
                  alt={btn.label}
                >
                  {btn.label}
                </Link>
              );
            } else {
              return (
                <button
                  key={btn.href}
                  className={btn.className}
                  onClick={handleSubmit}
                >
                  {btn.label}
                </button>
              );
            }
          })}
        </div>
        <div className="h-12 w-12 p-2 flex flex-col justify-around hover:bg-gray-100 sm:hidden">
          <div className="w-full h-1 bg-gray-900 rounded origin-left"></div>
          <div className="w-full h-1 bg-gray-900 rounded"></div>
          <div className="w-full h-1 bg-gray-900 rounded origin-left"></div>
        </div>
      </div>
    </nav>
  );
};
export default NavBar;
