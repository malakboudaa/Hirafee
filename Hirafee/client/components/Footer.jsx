const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="py-4 p-2 border-t bg-secondary">
      <div className=" text-center text-white">
        <p>&copy; {currentYear} Hirafee</p>
      </div>
    </footer>
  );
};
export default Footer;
