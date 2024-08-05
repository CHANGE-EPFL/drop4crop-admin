import {
    ArrayField,
    Datagrid,
    DateField,
    Show,
    SimpleFormIterator,
    SimpleShowLayout,
    TextField,
} from "react-admin";

export const StyleShow = () => {
    return (
        <Show >
            <SimpleShowLayout >
                <TextField source="name" />
                <ArrayField source="style" >
                    <Datagrid bulkActionButtons={false}>
                        <TextField source="value" />
                        <TextField source="red" />
                        <TextField source="green" />
                        <TextField source="blue" />
                        <TextField source="opacity" />
                        <TextField source="label" />
                    </Datagrid >
                </ArrayField>
            </SimpleShowLayout>
        </Show>
    )
};

export default StyleShow;
