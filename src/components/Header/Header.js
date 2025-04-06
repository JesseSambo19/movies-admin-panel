import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classes from './Header.module.css';
import { useAuth } from '../../store/auth-context';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import Logo from '../Logo/Logo';
import Modal from '../UI/Modal/Modal';
import Card from '../UI/Card/Card';
import Links from './components/Links/Links';

const Header = () => {
  const authCtx = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);
  const dropdownDesktopRef = useRef(null); // Reference for the dropdown
  const dropdownMobileRef = useRef(null); // Reference for the dropdown

  const openDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  const closeModal = () => {
    setShowMobileMenu(false);
  };

  const handleLogout = (setIsLoading) => {
    // closeDropdown();
    authCtx.onLogout(setIsLoading);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !isMobile &&
        dropdownDesktopRef.current &&
        !dropdownDesktopRef.current.contains(event.target)
      ) {
        closeDropdown();
      }
      if (
        isMobile &&
        dropdownMobileRef.current &&
        !dropdownMobileRef.current.contains(event.target)
      ) {
        closeDropdown();
      }
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 800);
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('resize', handleResize);

    // Clean up the listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  return (
    <nav className={classes.navbar}>
      <div>
        <span className={classes.logo}>
          <Link to="/home">
            <Logo />
          </Link>
        </span>
        <Links
          className1="list-desktop"
          className2="dropdown-desktop"
          className3="dropdown-menu-desktop"
          mobile={false}
          dropdownRef={dropdownDesktopRef}
          onCloseModal={closeModal}
          onOpenDropdown={openDropdown}
          onCloseDropdown={closeDropdown}
          onHandleLogout={handleLogout}
          userName={authCtx.userName}
          showDropdown={showDropdown}
        />
        <div
          className={classes['nav-burger-menu']}
          onClick={() => setShowMobileMenu((prev) => !prev)}
        >
          <AiOutlineMenu size={20} />
        </div>
        {isMobile && showMobileMenu && (
          <Modal onClose={closeModal}>
            <Card
              style={{ backgroundColor: '#230052' }}
              className={classes['position-relative']}
            >
              <div
                className={classes.close}
                onClick={() => setShowMobileMenu((prev) => !prev)}
              >
                <AiOutlineClose size={20} />
              </div>
              <Links
                className1="list-mobile"
                className2="dropdown-mobile"
                className3="dropdown-menu-mobile"
                mobile={true}
                dropdownRef={dropdownMobileRef}
                onCloseModal={closeModal}
                onOpenDropdown={openDropdown}
                onCloseDropdown={closeDropdown}
                onHandleLogout={handleLogout}
                userName={authCtx.userName}
                showDropdown={showDropdown}
              />
            </Card>
          </Modal>
        )}
      </div>
    </nav>
  );
};

export default Header;
