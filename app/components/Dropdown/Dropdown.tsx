import React from 'react';
import Link from 'next/link';

const DropdownMenu: React.FC = () => {
  const handleDropdownItemClick = (item: string) => {
    console.log(`Clicked on ${item}`);
  };

  return (
    <div className="dropdown">
      <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Dropdown
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <Link href="/userprofile">
          <a className="dropdown-item" onClick={() => handleDropdownItemClick("Profile")}>User Profile</a>
        </Link>
        <Link href="/userhistory">
          <a className="dropdown-item" onClick={() => handleDropdownItemClick("History")}>User History</a>
        </Link>
        <Link href="/login">
          <a className="dropdown-item" onClick={() => handleDropdownItemClick("Logout")}>Logout</a>
        </Link>
      </div>
    </div>
  );
};

export default DropdownMenu;
