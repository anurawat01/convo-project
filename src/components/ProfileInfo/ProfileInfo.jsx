import React, { useState, useEffect, useContext } from 'react';
import { Descriptions, message } from 'antd';
import { UserAuthContext } from '../../Context/UserAuthContext';


const PersonInfo = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const { authState } = useContext(UserAuthContext);
    useEffect(() => {
        message.loading("Fetching user info...");
        const fetchData = async () => {
            const apiEndpoint = `${process.env.API_BASE_URL}/user-info`;
            const options = {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${authState.token.token}`,
                },
            };
            try {
                const response = await fetch(apiEndpoint, options);
                if (response.ok) {
                    const responseData = await response.json();
                    setUserData(responseData);
                } else {
                    setError(`Failed to fetch data: ${response.statusText}`);
                }
            } catch (error) {
                setError(`Failed to fetch data: ${error.message}`);
            }
        };

        fetchData();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {userData ? (
                <Descriptions title="User Info">
                    <Descriptions.Item key="1" label="Name">
                        {userData.name}
                    </Descriptions.Item>
                    <Descriptions.Item key="1" label="Username">
                        {userData.username}
                    </Descriptions.Item>
                    <Descriptions.Item key="1" label="CreatedAt">
                        {userData.createdAt}
                    </Descriptions.Item>
                </Descriptions>
            ) : (
                'Loading...'
            )}
        </div>
    );
};

export default PersonInfo;
