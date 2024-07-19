import {
    List,
    Datagrid,
    TextField,
    BooleanField,
    BulkDeleteButton,
    BulkExportButton,
    BulkUpdateButton,
    useGetList,
    Loading,
    Pagination,
} from "react-admin";
import { FilterList, FilterListItem } from 'react-admin';
import { Card, CardContent, Typography } from '@mui/material';
import MailIcon from '@mui/icons-material/MailOutline';
import CategoryIcon from '@mui/icons-material/LocalOffer';
import {
    globalWaterModelsItems,
    climateModelsItems,
    cropItems,
    scenariosItems,
    variablesItems,
    yearItems
} from '../options';
import { Fragment, useState } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import YardOutlinedIcon from '@mui/icons-material/YardOutlined';

const StyleSelectMenu = () => {
    const [selectedStyle, setSelectedStyle] = useState(null);
    const { data, loading, error } = useGetList('styles');

    if (loading) return <Loading />;
    if (!data) return null;

    const handleChange = (event: SelectChangeEvent) => {
        setSelectedStyle(event.target.value);
    };

    const MenuItems = data.map(style => (
        <MenuItem key={style.id} value={style.id}>
            {style.name}
        </MenuItem>
    ));

    return (
        <>

            <Select
                label="Style"
                value={selectedStyle}
                onChange={handleChange}

            >
                {MenuItems}
            </Select>
            <BulkUpdateButton
                label="Update style"
                mutationMode="pessimistic"
                data={{
                    style_name: selectedStyle
                }} />
        </>
    );
}

const BulkActionButtons = () => {
    // Use the data from the styles endpoint to populate a drop down to
    // use with the BulkUpdateButton
    return (
        <Fragment>
            <BulkUpdateButton
                label="Disable"
                mutationMode="pessimistic"
                data={{ enabled: false }}
            />
            <BulkUpdateButton
                label="Enable"
                mutationMode="pessimistic"
                data={{ enabled: true }}
            />
            <StyleSelectMenu />
            <BulkExportButton />
            {/* <BulkDeleteButton mutationMode="pessimistic"/> */}
        </Fragment >
    )
};


export const FilterSidebar = () => {
    return (
        <Card sx={{ order: -1, mr: 2, mt: 6, width: 200 }}>
            <CardContent>
                <FilterList label="Crop" icon={<CategoryIcon />}>
                    {cropItems.map(item => (
                        <FilterListItem
                            key={item.id}
                            label={item.name}
                            value={{ crop: item.id }}
                        />
                    ))}
                </FilterList>
                <FilterList label="Water model" icon={<MailIcon />}>
                    {globalWaterModelsItems.map(item => (
                        <FilterListItem
                            key={item.id}
                            label={item.name}
                            value={{ water_model: item.id }}
                        />
                    ))}
                </FilterList>
                <FilterList label="Climate model" icon={<CategoryIcon />}>
                    {climateModelsItems.map(item => (
                        <FilterListItem
                            key={item.id}
                            label={item.name}
                            value={{ climate_model: item.id }}
                        />
                    ))}
                </FilterList>
                <FilterList label="Scenario" icon={<CategoryIcon />}>
                    {scenariosItems.map(item => (
                        <FilterListItem
                            key={item.id}
                            label={item.name}
                            value={{ scenario: item.id }}
                        />
                    ))}
                </FilterList>
                <FilterList label="Variable" icon={<CategoryIcon />}>
                    {variablesItems.map(item => (
                        <FilterListItem
                            key={item.id}
                            label={item.name}
                            value={{ variable: item.id }}
                        />
                    ))}
                </FilterList>
                <FilterList label="Year" icon={<CategoryIcon />}>
                    {yearItems.map(item => (
                        <FilterListItem
                            key={item.id}
                            label={item.name}
                            value={{ year: item.id }}
                        />
                    ))}
                </FilterList>

            </CardContent>
        </Card>
    )
};


export const LayerList = () => {

    const PostPagination = props => (
        <Pagination rowsPerPageOptions={[10, 25, 50, 100, 250]} {...props} />
    );

    return (
        <List
            queryOptions={{ refetchInterval: 5000 }}
            aside={<FilterSidebar />}
            storeKey={false}
            perPage={50}
            pagination={<PostPagination />}
        >
            <Datagrid rowClick="show" bulkActionButtons={<BulkActionButtons />}>
                <TextField source="crop" />
                <TextField source="water_model" />
                <TextField source="climate_model" />
                <TextField source="scenario" />
                <TextField source="variable" />
                <TextField source="year" />
                <BooleanField source="enabled" />
                <TextField source="style_name" />
            </Datagrid>
        </List>
    );
};

export default LayerList;
