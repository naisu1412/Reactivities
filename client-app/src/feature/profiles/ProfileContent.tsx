import React from 'react';
import { Tab } from 'semantic-ui-react';
import ProfilePhotos from './ProfilePhotos';
import ProfileDetails from './ProfileDetails';
import ProfileFollowings from './ProfileFollowings';
import ProfileActivities from './ProfileActivities';

const panes = [
    { menuItem: 'About', render: () => <Tab.Pane>About Content</Tab.Pane> },
    { menuItem: 'Photos', render: () => <ProfilePhotos /> },
    { menuItem: 'Profiles', render: () => <ProfileDetails /> },
    { menuItem: 'Activities', render: () => <ProfileActivities /> },
    { menuItem: 'Followers', render: () => <ProfileFollowings /> },
    { menuItem: 'Following', render: () => <ProfileFollowings /> },
]

interface IProps {
    setActiveTab: (activeIndex: any) => void;
}

export const ProfileContent: React.FC<IProps> = ({ setActiveTab }) => {
    return (
        <Tab
            menu={{ fluid: true, vertical: true }}
            menuPosition='right'
            panes={panes}
            onTabChange={(e, data) => setActiveTab(data.activeIndex)}
        />
    )
}
