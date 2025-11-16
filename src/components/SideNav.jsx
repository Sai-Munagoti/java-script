import React from "react";
import { NavLink } from "react-router-dom";

export default function SideNav({ links }) {
  return (
    <aside style={{ width: 220, borderRight: "1px solid #ddd", padding: 16 }}>
      <nav>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {links.map((l) => (
            <li key={l.to} style={{ margin: "8px 0" }}>
              <NavLink
                to={l.to}
                style={({ isActive }) => ({
                  textDecoration: "none",
                  color: isActive ? "blue" : "black",
                  fontWeight: isActive ? "600" : "400"
                })}
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
