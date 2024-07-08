import {
    List,
    Datagrid,
    TextField,
} from "react-admin";


export const LayerList = () => {
    return (
        <List>
            <Datagrid rowClick="show" >
                <TextField source="crop" />
                <TextField source="water_model" />
                <TextField source="climate_model" />
                <TextField source="scenario" />
                <TextField source="variable" />
                <TextField source="year" />
            </Datagrid>
        </List>
    );
};

export default LayerList;
