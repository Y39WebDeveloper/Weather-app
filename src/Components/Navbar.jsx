import { DropMenu } from "./";
import Logo from '/assets/images/logo.svg'

function Navbar() {
  return (
    <nav aria-label="Global" className="flex items-center justify-between mb-12 lg:mb-16">
      <div className="flex">
        <a href="/">
          <span className="sr-only">Weather</span>
          <img alt="" src={Logo} className="w-auto h-7 sm:h-10" />
        </a>
      </div>
      <DropMenu />
    </nav>
  );
}

export default Navbar;
