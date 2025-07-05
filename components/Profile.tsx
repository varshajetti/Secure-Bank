import React, { useState } from 'react';

// Reusable component for displaying data in view mode
const ProfileDetail: React.FC<{ label: string, value: string }> = ({ label, value }) => (
    <div>
        <dt className="text-sm font-medium text-gray-400">{label}</dt>
        <dd className="mt-1 text-lg text-white">{value}</dd>
    </div>
);

// Reusable component for editing data
const ProfileInput: React.FC<{ label: string, value: string, name: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ label, value, name, onChange }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-400">{label}</label>
        <input
            type="text"
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            className="mt-1 w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
    </div>
);

export const Profile: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        fullName: "Demo User",
        email: "demo@securebank.com",
        phone: "(555) 123-4567",
        address: "123 Security Lane",
        cityStateZip: "San Francisco, CA 94105",
    });

    // Store original data to be able to cancel
    const [originalProfileData, setOriginalProfileData] = useState(profileData);

    const handleEditClick = () => {
        setOriginalProfileData(profileData);
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setProfileData(originalProfileData);
        setIsEditing(false);
    };

    const handleSaveClick = () => {
        // Here you would typically make an API call to save the data
        setIsEditing(false);
        // We can update the original data now
        setOriginalProfileData(profileData);
    };
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfileData(prev => ({...prev, [name]: value}));
    };

    return (
        <div className="p-8 text-white">
            <div className="max-w-4xl mx-auto">
                {/* Profile Header */}
                <div className="bg-gray-800 rounded-2xl shadow-lg p-6 flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold">{profileData.fullName}</h2>
                        <p className="text-indigo-400">{profileData.email}</p>
                    </div>
                    {!isEditing && (
                        <button onClick={handleEditClick} className="ml-auto bg-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-indigo-500 transition-colors">
                            Edit Profile
                        </button>
                    )}
                </div>

                {/* Account Details */}
                <div className="mt-8 bg-gray-800 rounded-2xl shadow-lg p-8">
                    <h3 className="text-xl font-bold mb-6">Account Information</h3>
                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        {isEditing ? (
                            <ProfileInput label="Full Name" name="fullName" value={profileData.fullName} onChange={handleChange} />
                        ) : (
                            <ProfileDetail label="Full Name" value={profileData.fullName} />
                        )}
                        <ProfileDetail label="Member Since" value="July 20, 2021" />
                        <ProfileDetail label="Account Type" value="Premium Checking" />
                        <ProfileDetail label="Account Status" value="Active" />
                    </dl>
                </div>

                 {/* Contact Details */}
                 <div className="mt-8 bg-gray-800 rounded-2xl shadow-lg p-8">
                    <h3 className="text-xl font-bold mb-6">Contact & Address</h3>
                     <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        {isEditing ? (
                            <>
                                <ProfileInput label="Email Address" name="email" value={profileData.email} onChange={handleChange} />
                                <ProfileInput label="Phone Number" name="phone" value={profileData.phone} onChange={handleChange} />
                                <ProfileInput label="Street Address" name="address" value={profileData.address} onChange={handleChange} />
                                <ProfileInput label="City, State, Zip" name="cityStateZip" value={profileData.cityStateZip} onChange={handleChange} />
                            </>
                        ) : (
                            <>
                                <ProfileDetail label="Email Address" value={profileData.email} />
                                <ProfileDetail label="Phone Number" value={profileData.phone} />
                                <ProfileDetail label="Street Address" value={profileData.address} />
                                <ProfileDetail label="City, State, Zip" value={profileData.cityStateZip} />
                            </>
                        )}
                    </dl>
                </div>
                
                {isEditing && (
                    <div className="mt-8 flex justify-end space-x-4">
                        <button onClick={handleCancelClick} className="px-5 py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors duration-200">
                            Cancel
                        </button>
                        <button onClick={handleSaveClick} className="px-5 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 transition-colors duration-200">
                            Save Changes
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};