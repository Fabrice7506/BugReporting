// components/NavLinks.tsx
import { Links } from "../widget/Links";
import Link from "next/link";

const NavLinks = ({
  className = "btn btn-primary btn-soft btn-sm ml-2",
}: {
  className?: string;
}) => (
  <>
    {Links.map(({ href, label, icon: Icon }) => (
      <Link 
      key={href}
       href={href} 
       className={className}>
    
        <Icon className="w-4 h-4" /> {label}
      </Link>
    ))}
  </>
);

export default NavLinks;
