/* eslint react/jsx-key: off */
import {
    Edit,
    ReferenceInput,
    SelectInput,
    SimpleForm,
    TextField,
    TextInput,
    required
} from 'react-admin';

const StyleEdit = () => {
    return (
        <Edit>
            <SimpleForm>
                <TextField source="id" />
                <TextInput source="name" validate={[required()]} />
                <TextInput source="sld" validate={[required()]} multiline />
            </SimpleForm>
        </Edit>
    )
};

export default StyleEdit;
