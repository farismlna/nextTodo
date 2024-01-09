import Link from "next/link";
import "./style.css";
import links from "./data";

function Header() {
  return (
    <header className="app_header">
      <div>
        <h1 className="font-bold text-3xl">To-do List</h1>
        <small className="text-xs text-slate-500">Simple Todo-List app</small>
      </div>

      <nav className="ml-auto h-full flex">
        <ul className="flex h-full items-center">
          {links.map((link) => {
            return (
              <li className="w-auto h-auto">
                <Link
                  href={link.path}
                  className="flex px-6 py-4 hover:border-b-4 hover:border-sky-300 hover:bg-sky-50"
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
