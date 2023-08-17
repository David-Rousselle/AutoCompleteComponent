import * as React from 'react';
import { DropdownMenuItemType, IDropdownOption, IDropdownProps, Dropdown } from "@fluentui/react";
import { useState } from 'react';
import { CustomSearchBox } from './CustomSearchBox';

const SearchableDropdown: React.FC<IDropdownProps> = (props) => {

    const [searchText, setSearchText] = useState('');
    const handleText = (text: string) => {
        setSearchText(text);
    }

    const renderOption = (option: IDropdownOption): JSX.Element => {
        return (option.itemType === DropdownMenuItemType.Header && option.key === "FilterHeader") ?
            <CustomSearchBox onTextChange={handleText} />
            : <>{option.text}</>;
    }
    return (
        <Dropdown
            {...props
            }
            options={
                [
                    { key: 'FilterHeader', text: '-', itemType: DropdownMenuItemType.Header },
                    { key: 'divider_filterHeader', text: '-', itemType: DropdownMenuItemType.Divider },
                    ...props.options.map(option => !option.disabled && option.text.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ?
                        option : { ...option, hidden: true }
                    ),
                ]
            }
            calloutProps={{ shouldRestoreFocus: false, setInitialFocus: false }} //not working
            onRenderOption={(option) => renderOption(option)}
            onDismiss={() => setSearchText('')}
        />
    );       

}
export default SearchableDropdown;
