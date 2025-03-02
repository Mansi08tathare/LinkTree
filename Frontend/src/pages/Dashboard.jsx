  import React, { useState, useRef } from 'react';
  import { Copy, Trash2, X, Plus, Share2, Edit3, Image as ImageIcon } from 'lucide-react';
  import '../styles/Link.css';

  const Dashboard = () => {
    const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80');
    const [profileTitle, setProfileTitle] = useState('@popapp_io');
    const [profileBio, setProfileBio] = useState('');
    const [activeTab, setActiveTab] = useState('link');
    const [links, setLinks] = useState([]);
    const [shopLinks, setShopLinks] = useState([]);
    const [showLinkModal, setShowLinkModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentLinkType, setCurrentLinkType] = useState('link');
    const [currentLink, setCurrentLink] = useState(null);
    const [bannerColor, setBannerColor] = useState('#3A2A1D');
    const [customColor, setCustomColor] = useState('');
    const fileInputRef = useRef(null);

    const [linkForm, setLinkForm] = useState({
      title: '',
      url: '',
      image: '',
      enabled: true
    });

    const handleProfileImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setProfileImage(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    };

    const removeProfileImage = () => {
      setProfileImage('https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80');
    };

    const handleAddLink = () => {
      setLinkForm({
        title: '',
        url: '',
        image: '',
        enabled: true
      });
      setCurrentLinkType(activeTab);
      setShowLinkModal(true);
    };

    const handleLinkFormChange = (e) => {
      const { name, value, type, checked } = e.target;
      setLinkForm({
        ...linkForm,
        [name]: type === 'checkbox' ? checked : value
      });
    };

    const handleLinkImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setLinkForm({
            ...linkForm,
            image: e.target.result
          });
        };
        reader.readAsDataURL(file);
      }
    };

    const saveLinkForm = () => {
      if (currentLink !== null) {
        // Edit existing link
        if (currentLinkType === 'link') {
          const updatedLinks = [...links];
          updatedLinks[currentLink] = linkForm;
          setLinks(updatedLinks);
        } else {
          const updatedShopLinks = [...shopLinks];
          updatedShopLinks[currentLink] = linkForm;
          setShopLinks(updatedShopLinks);
        }
      } else {
        // Add new link to the list without replacing previous links
        if (currentLinkType === 'link') {
          setLinks((prevLinks) => [...prevLinks, linkForm]);  // ✅ Append instead of replace
        } else {
          setShopLinks((prevShopLinks) => [...prevShopLinks, linkForm]);  // ✅ Append instead of replace
        }
      }
      setShowLinkModal(false);
    };
    
    const editLink = (index, type) => {
      setCurrentLinkType(type);
      setCurrentLink(index);
      setLinkForm(type === 'link' ? links[index] : shopLinks[index]);
      setShowLinkModal(true); 
    };

    const toggleLinkStatus = (index, type) => {
      if (type === 'link') {
        const updatedLinks = [...links];
        updatedLinks[index].enabled = !updatedLinks[index].enabled;
        setLinks(updatedLinks);
      } else {
        const updatedShopLinks = [...shopLinks];
        updatedShopLinks[index].enabled = !updatedShopLinks[index].enabled;
        setShopLinks(updatedShopLinks);
      }
    };

    const confirmDeleteLink = () => {
      if (currentLinkType === 'link') {
        setLinks(links.filter((_, i) => i !== currentLink));
      } else {
        setShopLinks(shopLinks.filter((_, i) => i !== currentLink));
      }
      setShowDeleteModal(false);
    };

    const copyLink = (url) => {
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    };

    const copyProfileLink = () => {
      navigator.clipboard.writeText(`https://popapp.io/${profileTitle}`);
      alert('Profile link copied to clipboard!');
    };

    const handleColorChange = (color) => {
      setBannerColor(color);
    };

    const applyCustomColor = () => {
      if (customColor) {
        setBannerColor(customColor);
      }
    };

    const socialIcons = [
      { id: 'facebook', name: 'Facebook', color: '#1877F2' },
      { id: 'youtube', name: 'YouTube', color: '#FF0000' },
      { id: 'twitter', name: 'Twitter', color: '#1DA1F2' },
      { id: 'instagram', name: 'Instagram', color: '#E4405F' }
    ];

    const selectSocialIcon = (iconId) => {
      setLinkForm({
        ...linkForm,
        image: `/icons/${iconId}.png` // This is just a placeholder, in a real app you'd use actual icon paths
      });
    };

    return (
      <div className="link-container">
        <header className="header">
          <h1>Hi, Jenny Wilson!</h1>
        </header>

        <div className="content">
          <div className="mobile-preview">
            <div className="mobile-frame">
              <div className="mobile-header">
                <button className="share-button" onClick={copyProfileLink}>
                  <Share2 size={16} />
                </button>
              </div>
              <div className="mobile-content">
                <div className="profile-section" style={{ backgroundColor: bannerColor }}>
                  <img src={profileImage} alt="Profile" className="mobile-profile-image" />
                  <h3>{profileTitle}</h3>
                  {profileBio && <p className="mobile-bio">{profileBio}</p>}
                </div>

                <div className="mobile-tabs">
                  <button 
                    className={`mobile-tab ${activeTab === 'link' ? 'active' : ''}`}
                    onClick={() => setActiveTab('link')}
                  >
                    Links
                  </button>
                  <button 
                    className={`mobile-tab ${activeTab === 'shop' ? 'active' : ''}`}
                    onClick={() => setActiveTab('shop')}
                  >
                    Shop
                  </button>
                </div>

                <div className="mobile-links">
                  {activeTab === 'link' ? (
                    links.length > 0 ? (
                      links.map((link, index) => (
                        link.enabled && (
                          <a href={link.url} className="mobile-link" key={index} target="_blank" rel="noopener noreferrer">
                            {link.image && <img src={link.image} alt="" className="link-icon" />}
                            <span>{link.title}</span>
                          </a>
                        )
                      ))
                    ) : (
                      <div className="no-links">No links added yet</div>
                    )
                  ) : (
                    shopLinks.length > 0 ? (
                      shopLinks.map((link, index) => (
                        link.enabled && (
                          <a href={link.url} className="mobile-link" key={index} target="_blank" rel="noopener noreferrer">
                            {link.image && <img src={link.image} alt="" className="link-icon" />}
                            <span>{link.title}</span>
                          </a>
                        )
                      ))
                    ) : (
                      <div className="no-links">No shop links added yet</div>
                    )
                  )}
                </div>

                <button className="get-connected-button">Get Connected</button>
                <div className="powered-by">POPAPP</div>
              </div>
            </div>
          </div>

          <div className="editor">
            <section className="editor-section">
              <h2>Profile</h2>
              <div className="profile-editor">
                <div className="profile-image-container">
                  <img src={profileImage} alt="Profile" className="profile-image" />
                  <div className="profile-image-actions">
                    <button className="pick-image-button" onClick={() => fileInputRef.current.click()}>
                      Pick an image
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleProfileImageChange}
                      accept="image/*"
                      style={{ display: 'none' }}
                    />
                    <button className="remove-button" onClick={removeProfileImage}>
                      Remove
                    </button>
                  </div>
                </div>

                <div className="profile-details">
                  <div className="form-group">
                    <label>Profile Title</label>
                    <input
                      type="text"
                      value={profileTitle}
                      onChange={(e) => setProfileTitle(e.target.value)}
                      placeholder="@username"
                    />
                  </div>
                  <div className="form-group">
                    <label>Bio</label>
                    <textarea
                      value={profileBio}
                      onChange={(e) => setProfileBio(e.target.value)}
                      placeholder="Add a short bio..."
                      maxLength={80}
                    />
                    <div className="char-count">{profileBio.length} / 80</div>
                  </div>
                </div>
              </div>
            </section>

            <section className="editor-section">
              <div className="section-header">
                <h2>Add Links</h2>
                <button className="add-button" onClick={handleAddLink}>
                  <Plus size={16} /> Add
                </button>
              </div>

              <div className="tabs">
                <button 
                  className={`tab ${activeTab === 'link' ? 'active' : ''}`}
                  onClick={() => setActiveTab('link')}
                >
                  Link
                </button>
                <button 
                  className={`tab ${activeTab === 'shop' ? 'active' : ''}`}
                  onClick={() => setActiveTab('shop')}
                >
                  Shop
                </button>
              </div>

              <div className="links-container">
                {activeTab === 'link' ? (
                  links.length > 0 ? (
                    links.map((link, index) => (
                      <div className="link-item" key={index}>
                        <div className="link-item-left">
                          {link.image ? (
                            <img src={link.image} alt="" className="link-item-image" />
                          ) : (
                            <div className="link-item-image-placeholder">
                              <ImageIcon size={16} />
                            </div>
                          )}
                          <div className="link-item-details">
                            <h4>{link.title}</h4>
                            <p>{link.url}</p>
                          </div>
                        </div>
                        <div className="link-item-actions">
                          <label className="toggle">
                            <input
                              type="checkbox"
                              checked={link.enabled}
                              onChange={() => toggleLinkStatus(index, 'link')}
                            />
                            <span className="toggle-slider"></span>
                          </label>
                          <button className="icon-button" onClick={() => copyLink(link.url)}>
                            <Copy size={16} />
                          </button>
                          <button className="icon-button" onClick={() => editLink(index, 'link')}>
                            <Edit3 size={16} />
                          </button>
                          <button 
                            className="icon-button delete" 
                            onClick={() => {
                              setCurrentLink(index);
                              setCurrentLinkType('link');
                              setShowDeleteModal(true);
                            }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="no-links-message">No links added yet</div>
                  )
                ) : (
                  shopLinks.length > 0 ? (
                    shopLinks.map((link, index) => (
                      <div className="link-item" key={index}>
                        <div className="link-item-left">
                          {link.image ? (
                            <img src={link.image} alt="" className="link-item-image" />
                          ) : (
                            <div className="link-item-image-placeholder">
                              <ImageIcon size={16} />
                            </div>
                          )}
                          <div className="link-item-details">
                            <h4>{link.title}</h4>
                            <p>{link.url}</p>
                          </div>
                        </div>
                        <div className="link-item-actions">
                          <label className="toggle">
                            <input
                              type="checkbox"
                              checked={link.enabled}
                              onChange={() => toggleLinkStatus(index, 'shop')}
                            />
                            <span className="toggle-slider"></span>
                          </label>
                          <button className="icon-button" onClick={() => copyLink(link.url)}>
                            <Copy size={16} />
                          </button>
                          <button className="icon-button" onClick={() => editLink(index, 'shop')}>
                            <Edit3 size={16} />
                          </button>
                          <button 
                            className="icon-button delete" 
                            onClick={() => {
                              setCurrentLink(index);
                              setCurrentLinkType('shop');
                              setShowDeleteModal(true);
                            }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="no-links-message">No shop links added yet</div>
                  )
                )}
              </div>
            </section>

            <section className="editor-section">
              <h2>Banner</h2>
              <div className="banner-preview" style={{ backgroundColor: bannerColor }}>
                <img src={profileImage} alt="Profile" className="banner-profile-image" />
                <h3>{profileTitle}</h3>
                <p className="banner-subtitle">@popapp.io</p>
              </div>

              <div className="color-options">
                <h4>Custom Background Color</h4>
                <div className="color-swatches">
                  <button 
                    className={`color-swatch ${bannerColor === '#3A2A1D' ? 'active' : ''}`} 
                    style={{ backgroundColor: '#3A2A1D' }}
                    onClick={() => handleColorChange('#3A2A1D')}
                  ></button>
                  <button 
                    className={`color-swatch ${bannerColor === '#000000' ? 'active' : ''}`} 
                    style={{ backgroundColor: '#000000' }}
                    onClick={() => handleColorChange('#000000')}
                  ></button>
                  <button 
                    className={`color-swatch ${bannerColor === '#FFFFFF' ? 'active' : ''}`} 
                    style={{ backgroundColor: '#FFFFFF', border: '1px solid #ddd' }}
                    onClick={() => handleColorChange('#FFFFFF')}
                  ></button>
                </div>
                <div className="custom-color">
                  <input 
                    type="text" 
                    placeholder="#FFFFFF" 
                    value={customColor}
                    onChange={(e) => setCustomColor(e.target.value)}
                  />
                  <button onClick={applyCustomColor}>Apply</button>
                </div>
              </div>
            </section>

            <div className="save-section">
              <button className="save-button">Save</button>
            </div>
          </div>
        </div>

        {/* Link Modal */}
        {showLinkModal && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h3>{currentLink !== null ? 'Edit Link' : 'Add Link'}</h3>
                <button className="close-button" onClick={() => setShowLinkModal(false)}>
                  <X size={20} />
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Enter URL</label>
                  <input
                    type="text"
                    name="url"
                    value={linkForm.url}
                    onChange={handleLinkFormChange}
                    placeholder="https://example.com"
                  />
                </div>
                <div className="form-group">
                  <label>Link Title</label>
                  <input
                    type="text"
                    name="title"
                    value={linkForm.title}
                    onChange={handleLinkFormChange}
                    placeholder="My Website"
                  />
                </div>
                <div className="form-group">
                  <label>Link Icon</label>
                  <div className="social-icons-grid">
                    {socialIcons.map(icon => (
                      <div 
                        key={icon.id}
                        className={`social-icon ${linkForm.image === `/icons/${icon.id}.png` ? 'selected' : ''}`}
                        style={{ backgroundColor: icon.color }}
                        onClick={() => selectSocialIcon(icon.id)}
                      >
                        {icon.id.charAt(0).toUpperCase()}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="form-group toggle-group">
                  <label>Enabled</label>
                  <label className="toggle">
                    <input
                      type="checkbox"
                      name="enabled"
                      checked={linkForm.enabled}
                      onChange={handleLinkFormChange}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
              <div className="modal-footer">
                <button className="save-link-button" onClick={saveLinkForm}>Save</button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="modal-overlay">
            <div className="modal delete-modal">
              <div className="modal-header">
                <h3>Delete Link</h3>
                <button className="close-button" onClick={() => setShowDeleteModal(false)}>
                  <X size={20} />
                </button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this link?</p>
              </div>
              <div className="modal-footer">
                <button className="cancel-button" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                <button className="delete-button" onClick={confirmDeleteLink}>Delete</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  export default Dashboard;