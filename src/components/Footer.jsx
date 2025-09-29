const Footer = () => {
  return (
    <footer className="mt-10 text-center text-sm text-gray-600">
      <div className="flex flex-wrap justify-center gap-4 mb-2">
        <a href="#" className="hover:underline">
          About
        </a>
        <a href="#" className="hover:underline">
          Privacy
        </a>
        <a href="#" className="hover:underline">
          Terms
        </a>
        <a href="#" className="hover:underline">
          Contact
        </a>
      </div>
      <p className="text-xs text-gray-500">
        © {new Date().getFullYear()} TodoFlow by Seid. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
