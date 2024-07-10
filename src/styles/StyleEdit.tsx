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
                <TextInput source="id" disabled />
                <TextInput source="sld" validate={[required()]} multiline fullWidth component='pre' />
            </SimpleForm>
        </Edit>
    )
};

export default StyleEdit;
