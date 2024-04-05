import "~/styles/landing/globals.css";
import Link from "next/link";
import AuthButton from "./AuthButton"; // Adjust the import path as necessary

const OrgLandingNav = ({ user }) => {
  return (
    <div className="container2">
      {user && (
        <Link href="/louis" prefetch={true}>
          <a className="button type--A">
            <div className="button__line"></div>
            <div className="button__line"></div>
            <span className="button__text sp">Chat Now</span>
            <div className="button__drow1"></div>
            <div className="button__drow2"></div>
          </a>
        </Link>
      )}

      <Link href="/about" prefetch={true}>
        <a className="button type--B">
          <div className="button__line"></div>
          <div className="button__line"></div>
          <span className="button__text sp">Learn More</span>
          <div className="button__drow1"></div>
          <div className="button__drow2"></div>
        </a>
      </Link>
    </div>
  );
};

export default OrgLandingNav;
