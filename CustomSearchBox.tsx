import * as React from 'react';
import { SearchBox,  ISearchBox, ISearchBoxStyles } from "@fluentui/react";
import { useEffect, useRef } from 'react';
import * as strings from 'CapacityPlanningUIStrings';

interface ICustomSearchBoxProps {
    onTextChange: any;
}

export const CustomSearchBox: React.FC<ICustomSearchBoxProps> = (props) => {

    const searchBoxStyles: Partial<ISearchBoxStyles> =
    {
        root: { height: '20px' },
        field: { fontSize: '12px' },
    };

    const _searchBoxRef = useRef<ISearchBox>();

    const setFocus = () => {
        if (!_searchBoxRef.current.hasFocus()) {
            _searchBoxRef.current.focus();
            setTimeout(() => { setFocus(); }, 100);
        }
    }

    useEffect(() => {
        setFocus();
    });

    return (
        <SearchBox
            styles={searchBoxStyles}
            componentRef={_searchBoxRef}
            onChange={(ev, newValue) => props.onTextChange(newValue)}
            underlined={true}
            placeholder={strings.SearchOptions} />
    );
};
