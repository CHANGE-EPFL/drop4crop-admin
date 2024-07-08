import { Admin, Resource } from "react-admin";
import simpleRestProvider from 'ra-data-simple-rest';
import layers from './layers';

const App = () => (
    <Admin dataProvider={simpleRestProvider('/api')} >
        <Resource name="layers" {...layers} />
    </Admin>
);

export default App;