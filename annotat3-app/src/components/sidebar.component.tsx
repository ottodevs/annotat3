import Image from 'next/image'
import Link from 'next/link'

import { FaHome, FaUser, FaHashtag } from "react-icons/fa";
import { SidebarProps } from '../types';



export const Sidebar = ({name, username, id}: SidebarProps) => {

  return (
    <div className="sidebar">
      <div className="top">
        <div className="logoContainer">
          <Image
            alt="Ceramic Logo"
            src="/ceramicLogo.png"
            height={100}
            width={200}
            priority
          />
        </div>
        <Link legacyBehavior href = "/">
          <a>
            <FaHome /> Home
          </a>
        </Link>
        <Link legacyBehavior href = {`/profile`}>
          <a>
            <FaUser /> Profile
          </a>
        </Link>
        <Link legacyBehavior href = "/explore">
          <a>
            <FaHashtag /> Explore
          </a>
        </Link>
      </div>
      <div className="bottom">
        {name !== undefined ? (
          <div className="you">
            <b>{name}</b> <br />
            <Link legacyBehavior href = {`user/${id}`}>
              <a>
              @{username}
              </a>
            </Link>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
