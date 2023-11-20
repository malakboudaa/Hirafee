import buildClient from "../api/build-client";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import "../styles/globals.css";

const AppComponent = ({ Component, pageProps, currentUser }) => {
  // let currentUser = {
  //   id: "648c987849dbaeaea7ba3f3b",
  //   email: "ryvuf@mailinator.com",
  //   role: "client",
  //   iat: 1686935673,
  // };
  // let currentUser = null;

  let links;

  let adminLinks = [
    { label: "Bans", href: "/admin/bans" },
    { label: "Reports", href: "/admin/reports" },
    { label: "Categories", href: "/admin/categories" },
  ];
  let clientLinks = [
    { label: "Gigs", href: "/client/gigs" },
    { label: "Artisans", href: "/client/artisans" },
    { label: "Messages", href: "/client/messages" },
    { label: "Payment", href: "/client/payments" },
  ];
  let artisanLinks = [
    { label: "Gigs", href: "/artisan/gigs" },
    { label: "Messages", href: "/artisan/messages" },
  ];
  let visitorLinks = [
    { label: "Home", href: "/" },
    { label: "Artisans", href: "/artisans" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  if (currentUser) {
    switch (currentUser.role) {
      case "admin":
        links = adminLinks;
        break;
      case "client":
        links = clientLinks;
        break;
      case "artisan":
        links = artisanLinks;
        break;
    }
  } else {
    links = visitorLinks;
  }

  let btns;
  let signedOutBtns = [
    {
      label: "signin",
      type: "link",
      href: "/auth/signin",
      className:
        "text-secondary rounded-full hover:bg-gray-100 font-semibold py-2 px-6",
    },
    {
      label: "signup",
      type: "link",
      href: "/auth/signup",
      className:
        "bg-secondary text-white font-semibold py-2 px-6 rounded-full border border-secondary hover:bg-white hover:text-secondary",
    },
  ];

  let signedUpBtns = [
    {
      label: "signout",
      type: "btn",
      href: "/auth/signout",
      className:
        "text-secondary border border-secondary rounded-full hover:bg-gray-100 font-semibold py-2 px-6",
    },
  ];

  if (currentUser) {
    btns = signedUpBtns;
  } else {
    btns = signedOutBtns;
  }

  return (
    <>
      <NavBar links={links} btns={btns} />
      <Component {...pageProps} currentUser={currentUser} />
      <Footer />
    </>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  const { data } = await buildClient(appContext.ctx).get(
    "/api/users/currentuser"
  );
  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }
  console.log(data);
  return { pageProps, ...data };
};

export default AppComponent;
