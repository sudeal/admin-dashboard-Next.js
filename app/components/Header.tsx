type HeaderProps = {
    onMenuClick?: () => void;
    onMenuClickDesktop?: () => void;
  };

export default function Header({ onMenuClick, onMenuClickDesktop }: HeaderProps) {
    const handleMenuClick = () => {
      if (onMenuClick) onMenuClick();
      if (onMenuClickDesktop) onMenuClickDesktop();
    };

    return (
      <header className="ds-header">
        <div className="ds-header__left">
          <button 
            className="ds-icon-btn" 
            type="button" 
            aria-label="Menu"
            onClick={handleMenuClick}
          >
            <i className="bi bi-list" />
          </button>
  
          <div className="ds-search">
            <i className="bi bi-search ds-search__icon" />
            <input className="ds-search__input" placeholder="Search" />
          </div>
        </div>

        <div className="ds-header__right">
          <button className="ds-icon-btn" type="button" aria-label="Notifications">
            <span className="ds-badge-dot" />
            <i className="bi bi-bell" />
          </button>
  
          <button className="ds-icon-btn" type="button" aria-label="Theme">
            <i className="bi bi-moon" />
          </button>
  
          <button className="ds-pill" type="button" aria-label="Language">
            <i className="bi bi-globe2" />
            <span>English</span>
            <i className="bi bi-chevron-down ds-pill__chev" />
          </button>
  
          <button className="ds-profile" type="button" aria-label="Profile">
            <span className="ds-avatar">
              <i className="bi bi-person" />
            </span>
            <span className="ds-profile__text">
              <span className="ds-profile__name">Moni Roy</span>
              <span className="ds-profile__role">Admin</span>
            </span>
            <i className="bi bi-chevron-down ds-profile__chev" />
          </button>
        </div>
      </header>
    );
}