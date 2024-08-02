"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebaseConfig';
const ProfilePage: React.FC = () => {
    const { data: session } = useSession();
    const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false); 
    const [profileData, setProfileData] = useState<any>(null);
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      address: '',
      url: '',
      gender: '',
      bio: '',
      facebook: '',
      twitter: '',
    });

    
    // Fetch the profile data when the component mounts
    const getProfile = async () => {
      try {
        const res = await fetch('/api/profile');
        if (!res.ok) throw new Error('Failed to fetch profile data');
        const data = await res.json();
        setProfileData(data);
        // Set formData with fetched profile data
        setFormData({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth).toISOString().split('T')[0] : '',
          address: data.address || '',
          url: data.url || '',
          gender: data.gender || '',
          bio: data.bio || '',
          facebook: data.facebook || '',
          twitter: data.twitter || '',
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
  
    useEffect(() => {
      if (session) {
        getProfile();
      }
    }, [session]);
    const previewImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setProfileImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFile(file); // Set selected file to state
        }
    };
    
    const handleUpload = async () => {
        if (!file) return; // Check if file is null
        setUploading(true);
        const storageRef = ref(storage, `images/${file.name}`);
        try {
            await uploadBytes(storageRef, file);
            const url = await getDownloadURL(storageRef);
            setFormData((prevFormData) => ({
                ...prevFormData,
                url: url, // Update formData with the image URL
            }));
            console.log('File uploaded successfully');
        } catch (error) {
            console.error('Failed to upload file');
        } finally {
            setUploading(false);
        }
    };
    
    const handleFocus = (section: string) => 
    {
        setActiveSection(section);
    };
    const handleBlur = () => {
        setActiveSection(null);
    };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
    {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    const handleSubmit = async (event : any) => {
        event.preventDefault()
        try {
          const response = await axios.post('/api/profile', formData);
          console.log('Profile upserted:', response.data);
        } catch (error) {
          console.error('Error upserting profile:', error);
          alert('Something went wrong');
        }
      };
      

    const handleReset = () => {
        setFormData({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        address: '',
        url: '',
        gender: '',
        bio: '',
        facebook: '',
        twitter: '',
        });
    };

    return (
        <div className="mt-[50px]" style={{
            backgroundImage: 'url("https://i.pinimg.com/originals/a3/7b/d0/a37bd0c6481e9a791054c27878e9963e.png")', // Replace with your image URL
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
        }}>
            <div style={{
                maxWidth: '900px',
                width: '100%',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
                display: 'flex',
                padding: '20px',
                backdropFilter: 'blur(10px)',
            }}>
                {/* Sidebar */}
                <div style={{
                    width: '35%',
                    backgroundColor: '#f7fafc',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <div style={{
    width: '100px',
    height: '100px',
    marginBottom: '16px',
    position: 'relative'
}}>
    <div style={{
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        border: '4px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f7fafc',
        color: '#a0aec0',
        fontSize: '14px',
        fontWeight: '600',
        position: 'relative' // Ensure position relative for absolute positioning of elements
    }}>
        {profileImage ? (
            <img
                src={profileImage}
                alt="Profile"
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    objectFit: 'cover'
                }}
            />
        ) : formData.url ? ( // Check if formData.url has a value
            <img
                src={formData.url}
                alt="Profile"
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    objectFit: 'cover'
                }}
            />
        ) : (
            <span className="box">Profile Pic</span>
        )}
        <input
            type="file"
            accept="image/*"
            onChange={(event) => {
                handleFileChange(event); // Call handleFileChange on file selection
                previewImage(event); // Optional: Call previewImage if you need to display preview before upload
            }}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0,
                cursor: 'pointer'
            }}
        />
    </div>
    <button
        onClick={handleUpload} // Call handleUpload when the upload button is clicked
        style={{
            marginTop: '8px',
            backgroundColor: '#3182ce',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer'
        }}
    >
        Upload
    </button>
</div>

                    <h2 className="mt-10px" style={{
                        fontSize: '18px',
                        fontWeight: '600',
                        color: '#2d3748',
                        marginBottom: '4px'
                    }}>{session?.user.username}</h2>
                     <p style={{
                        color: '#718096'
                    }}>{session?.user.username}</p>
                    <p style={{
                        color: '#718096'
                    }}>{session?.user.email}</p>
                </div>
                {/* Main Content */}
                <div style={{
                    width: '65%',
                    padding: '20px'
                }}>
                    <h2 style={{
                        fontSize: '24px',
                        fontWeight: '700',
                        color: '#2d3748',
                        textAlign: 'center',
                        marginBottom: '20px'
                    }}>Profile Page</h2>

                    <form onSubmit={handleSubmit}>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '12px',
                            marginBottom: '12px'
                        }}>
                            <div style={{
                                padding: '12px',
                                borderRadius: '8px',
                                backgroundColor: activeSection === 'firstName' ? '#ebf8ff' : 'transparent'
                            }}>
                                <label
                                    htmlFor="firstName"
                                    style={{
                                        display: 'block',
                                        color: '#4a5568',
                                        fontWeight: '700',
                                        marginBottom: '4px'
                                    }}>
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    onFocus={() => handleFocus('firstName')}
                                    onBlur={handleBlur}
                                    style={{
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '4px',
                                        padding: '8px',
                                        width: '100%',
                                        color: '#4a5568',
                                        outline: 'none',
                                        transition: 'border 0.2s'
                                    }}
                                />
                            </div>
                            <div style={{
                                padding: '12px',
                                borderRadius: '8px',
                                backgroundColor: activeSection === 'lastName' ? '#ebf8ff' : 'transparent'
                            }}>
                                <label
                                    htmlFor="lastName"
                                    style={{
                                        display: 'block',
                                        color: '#4a5568',
                                        fontWeight: '700',
                                        marginBottom: '4px'
                                    }}>
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    onFocus={() => handleFocus('lastName')}
                                    onBlur={handleBlur}
                                    style={{
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '4px',
                                        padding: '8px',
                                        width: '100%',
                                        color: '#4a5568',
                                        outline: 'none',
                                        transition: 'border 0.2s'
                                    }}
                                />
                            </div>
                        </div>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr',
                            gap: '12px',
                            marginBottom: '12px'
                        }}>
                            <div style={{
                                padding: '12px',
                                borderRadius: '8px',
                                backgroundColor: activeSection === 'dateOfBirth' ? '#ebf8ff' : 'transparent'
                            }}>
                                <label
                                    htmlFor="dateOfBirth"
                                    style={{
                                        display: 'block',
                                        color: '#4a5568',
                                        fontWeight: '700',
                                        marginBottom: '4px'
                                    }}>
                                    Date of Birth
                                </label>
                                <input
                                    type="date"
                                    id="dateOfBirth"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleChange}
                                    onFocus={() => handleFocus('dateOfBirth')}
                                    onBlur={handleBlur}
                                    style={{
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '4px',
                                        padding: '8px',
                                        width: '100%',
                                        color: '#4a5568',
                                        outline: 'none',
                                        transition: 'border 0.2s'
                                    }}
                                />
                            </div>
                        </div>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr',
                            gap: '12px',
                            marginBottom: '12px'
                        }}>
                            <div style={{
                                padding: '12px',
                                borderRadius: '8px',
                                backgroundColor: activeSection === 'address' ? '#ebf8ff' : 'transparent'
                            }}>
                                <label
                                    htmlFor="address"
                                    style={{
                                        display: 'block',
                                        color: '#4a5568',
                                        fontWeight: '700',
                                        marginBottom: '4px'
                                    }}>
                                    Address
                                </label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    onFocus={() => handleFocus('address')}
                                    onBlur={handleBlur}
                                    style={{
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '4px',
                                        padding: '8px',
                                        width: '100%',
                                        color: '#4a5568',
                                        outline: 'none',
                                        transition: 'border 0.2s'
                                    }}
                                />
                            </div>
                        </div>
                        <div style={{
                            padding: '12px',
                            borderRadius: '8px',
                            backgroundColor: activeSection === 'gender' ? '#ebf8ff' : 'transparent',
                            marginBottom: '12px'
                        }}>
                            <label
                                htmlFor="gender"
                                style={{
                                    display: 'block',
                                    color: '#4a5568',
                                    fontWeight: '700',
                                    marginBottom: '4px'
                                }}>
                                Gender
                            </label>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginTop: '8px'
                            }}>
                                <input type="radio" id="male" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleChange} />
                                <label
                                    htmlFor="male"
                                    style={{
                                        marginRight: '8px',
                                        marginLeft: '4px',
                                        color: '#4a5568'
                                    }}>Male</label>
                                <input type="radio" id="female" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleChange} />
                                <label
                                    htmlFor="female"
                                    style={{
                                        marginRight: '8px',
                                        marginLeft: '4px',
                                        color: '#4a5568'
                                    }}>Female</label>
                                <input type="radio" id="other" name="gender" value="other" checked={formData.gender === 'other'} onChange={handleChange} />
                                <label
                                    htmlFor="other"
                                    style={{
                                        marginRight: '8px',
                                        marginLeft: '4px',
                                        color: '#4a5568'
                                    }}>Other</label>
                            </div>
                        </div>
                        <div style={{
                            padding: '12px',
                            borderRadius: '8px',
                            backgroundColor: activeSection === 'bio' ? '#ebf8ff' : 'transparent',
                            marginBottom: '12px'
                        }}>
                            <label
                                htmlFor="bio"
                                style={{
                                    display:
                                    'block',
                                    color: '#4a5568',
                                    fontWeight: '700',
                                    marginBottom: '4px'
                                }}>
                                Bio
                            </label>
                            <textarea
                                id="bio"
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                onFocus={() => handleFocus('bio')}
                                onBlur={handleBlur}
                                style={{
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '4px',
                                    padding: '8px',
                                    width: '100%',
                                    minHeight: '80px',
                                    color: '#4a5568',
                                    outline: 'none',
                                    transition: 'border 0.2s',
                                    resize: 'vertical'
                                }}
                            />
                        </div>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '12px',
                            marginBottom: '12px'
                        }}>
                            <div style={{
                                padding: '12px',
                                borderRadius: '8px',
                                backgroundColor: activeSection === 'facebook' ? '#ebf8ff' : 'transparent'
                            }}>
                                <label
                                    htmlFor="facebook"
                                    style={{
                                        display: 'block',
                                        color: '#4a5568',
                                        fontWeight: '700',
                                        marginBottom: '4px'
                                    }}>
                                    Facebook
                                </label>
                                <input
                                    type="text"
                                    id="facebook"
                                    name="facebook"
                                    value={formData.facebook}
                                    onChange={handleChange}
                                    onFocus={() => handleFocus('facebook')}
                                    onBlur={handleBlur}
                                    style={{
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '4px',
                                        padding: '8px',
                                        width: '100%',
                                        color: '#4a5568',
                                        outline: 'none',
                                        transition: 'border 0.2s'
                                    }}
                                />
                            </div>
                            <div style={{
                                padding: '12px',
                                borderRadius: '8px',
                                backgroundColor: activeSection === 'twitter' ? '#ebf8ff' : 'transparent'
                            }}>
                                <label
                                    htmlFor="twitter"
                                    style={{
                                        display: 'block',
                                        color: '#4a5568',
                                        fontWeight: '700',
                                        marginBottom: '4px'
                                    }}>
                                    Twitter
                                </label>
                                <input
                                    type="text"
                                    id="twitter"
                                    name="twitter"
                                    value={formData.twitter}
                                    onChange={handleChange}
                                    onFocus={() => handleFocus('twitter')}
                                    onBlur={handleBlur}
                                    style={{
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '4px',
                                        padding: '8px',
                                        width: '100%',
                                        color: '#4a5568',
                                        outline: 'none',
                                        transition: 'border 0.2s'
                                    }}
                                />
                            </div>
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '20px'
                        }}>
                            <button
                                type="submit"
                                style={{
                                    backgroundColor: '#4299e1',
                                    color: 'white',
                                    padding: '12px 24px',
                                    borderRadius: '4px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    transition: 'background-color 0.2s',
                                    marginRight: '10px'
                                }}>
                                Save Changes
                            </button>
                            <button
                                type="button"
                                onClick={handleReset}
                                style={{
                                    backgroundColor: '#cbd5e0',
                                    color: '#4a5568',
                                    padding: '12px 24px',
                                    borderRadius: '4px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    transition: 'background-color 0.2s'
                                }}>
                                Reset
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
