import { Admin, Resource } from "react-admin";
import simpleRestProvider from 'ra-data-simple-rest';
import layers from './layers';
import styles from './styles';


const App = () => (
    <Admin dataProvider={simpleRestProvider('/api')} >
        <Resource name="layers" {...layers} />
        <Resource name="styles" {...styles} />
    </Admin>
);

export default App;