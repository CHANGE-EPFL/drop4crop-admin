import {
    List,
    Datagrid,
    TextField,
} from "react-admin";


export const StyleList = () => {
    return (
        <List storeKey={false}>
            <Datagrid rowClick="show" >
                <TextField source="name" />
            </Datagrid>
        </List>
    );
};

export default StyleList;
