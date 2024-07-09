/* eslint react/jsx-key: off */
import {
    Create,
    SimpleForm,
    TextField,
    TextInput,
    required,
} from 'react-admin';


const StyleCreate = () => {
    return (
        <Create redirect="show">
            <SimpleForm  >
                <TextField source="id" />
                <TextInput source="name" validate={[required()]} />
                <TextInput source="sld" validate={[required()]} multiline />
            </SimpleForm>
        </Create >
    )
};

export default StyleCreate;
