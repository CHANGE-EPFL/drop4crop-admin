import {
    DateField,
    Show,
    SimpleShowLayout,
    TextField,
} from "react-admin";

export const StyleShow = () => {
    return (
        <Show >
            <SimpleShowLayout >
                <TextField source="name" />
                <TextField source="filename" />
                <DateField source="dateCreated" showTime />
                <DateField source="dateModified" showTime />
                <TextField source="format" />
                <TextField source="languageVersion.version" label="Version" />
                <TextField source="variable" />
                <TextField source="year" />
                <TextField source="sld" component='pre' width={100} />
            </SimpleShowLayout>
        </Show>
    )
};

export default StyleShow;
