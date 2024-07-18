/* eslint react/jsx-key: off */
import { useState, useRef, useEffect } from 'react';
import {
    Admin,
    Resource,
    AuthProvider,
    DataProvider,
    Loading,
} from 'react-admin';
// import simpleRestProvider from 'ra-data-simple-rest';
import simpleRestProvider from './dataProvider/index'
import Keycloak, {
    KeycloakTokenParsed,
    KeycloakInitOptions,
} from 'keycloak-js';
import { httpClient } from 'ra-keycloak';
import { keycloakAuthProvider } from './authProvider';
import Layout from './Layout';
import users from './users';
import styles from './styles';
import layers from './layers';
import axios from 'axios';
import { defaultTheme } from 'react-admin';
const initOptions: KeycloakInitOptions = {
    onLoad: 'login-required',
    checkLoginIframe: false,
};

const getPermissions = (decoded: KeycloakTokenParsed) => {
    const roles = decoded?.realm_access?.roles;
    if (!roles) {
        return false;
    }
    if (roles.includes('admin')) return 'admin';
    if (roles.includes('user')) return 'user';
    return false;
};

const apiKeycloakConfigUrl = '/api/config/keycloak';
export const apiUrl = '/api';

const App = () => {
    const [keycloak, setKeycloak] = useState();
    const [loading, setLoading] = useState(true);
    const authProvider = useRef<AuthProvider>();
    const dataProvider = useRef<DataProvider>();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(apiKeycloakConfigUrl);
                const keycloakConfig = response.data;

                // Initialize Keycloak here, once you have the configuration
                const keycloakClient = new Keycloak(keycloakConfig);
                await keycloakClient.init(initOptions);
                authProvider.current = keycloakAuthProvider(keycloakClient, {
                    onPermissions: getPermissions,
                });
                dataProvider.current = simpleRestProvider(
                    apiUrl,
                    httpClient(keycloakClient)
                );
                setKeycloak(keycloakClient);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        }

        fetchData();
    }, []);


    // hide the admin until the dataProvider and authProvider are ready
    if (!keycloak & loading) return <Loading />;


    const theme = {
        ...defaultTheme,
        sidebar: {
            width: 150, // The default value is 240
        },
    };
    return (
        <Admin
            authProvider={authProvider.current}
            dataProvider={dataProvider.current}
            title="SOIL Sensor Map"
            layout={Layout}
            theme={theme}
        >
            {permissions => (
                <>
                    {permissions ? (
                        <>
                            {permissions === 'admin' ? (
                                <>
                                    <Resource name="layers" {...layers} />
                                    <Resource name="styles" {...styles} />
                                    <Resource name="users" {...users} />
                                </>
                            ) : null}
                        </>
                    ) : null}
                </>
            )}
        </Admin>
    );
};
export default App;
