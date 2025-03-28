import React from "react";
import "./Menu.css";

const Menu = ({ active, onClickMenuItem }) => {
  const [showNavbar, setShowNavbar] = React.useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const links = [
    { id: 1, name: "General News", value: "general" },
    { id: 2, name: "Business News", value: "business" },
    { id: 3, name: "Entertainment News", value: "entertainment" },
    { id: 4, name: "Health News", value: "health" },
    { id: 5, name: "Science News", value: "science" },
    { id: 6, name: "Sports News", value: "sports" },
    { id: 7, name: "Technology News", value: "technology" },
  ];
  
  return (
    <nav className="menu">
      <ul>
        {links.map((link) => (
          <li
            key={link.id}
            className={active === link.id ? "active" : "inactive"}
            onClick={() => onClickMenuItem(link.id, link.value)}
          >
            {link.name}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
