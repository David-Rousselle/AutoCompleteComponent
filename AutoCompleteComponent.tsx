import { IDropdown, IDropdownOption, IDropdownStyles } from "@fluentui/react";
import * as React from "react";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import SearchableDropdown from "./SearchableDropdown";

export const AutoCompleteComponent = forwardRef((props: any, ref) => {
    const placeholder = props.placeholder;

    const dropdownStyles: Partial<IDropdownStyles> =
    {
        dropdownItemHeader: {  height: '20px' },
        dropdown: {  width: '100%', height: '100%', display: "inline-block", },
        root: {
            width: '100%', height: '100%', display: "inline-flex",
            alignItems: "center"
        },
        dropdownItem: { fontSize: '12px', minHeight: '20px' },
        dropdownItemSelected: { fontSize: '12px', minHeight: '20px' },
        title: {
            fontSize: '12px', height: '100%',
        },
        callout: { minHeight: '28px' },
    };
        
    const [selectedKey, setSelectedKey] = useState(props.selectedKey);
    const refInput = useRef<IDropdown>();

    useEffect(() => {
        // focus on the input
        refInput.current.focus();
    }, []);

    /* Component Editor Lifecycle methods */
    useImperativeHandle(ref, () => {
        return {
            // the final value to send to the grid, on completion of editing
            getValue() {
                // this simple editor doubles any value entered into the input
                return selectedKey;
            },

            // Gets called once before editing starts, to give editor a chance to
            // cancel the editing before it even starts.
            isCancelBeforeStart() {
                return false;
            },

            // Gets called once when editing is finished (eg if Enter is pressed).
            // If you return true, then the result of the edit will be ignored.
            isCancelAfterEnd() {
                // our editor will reject any value greater than 1000
                return false;
            }
        };
    });

    const onChangeOption = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
        setSelectedKey(item.key);
    }

    return (
        <SearchableDropdown
            componentRef={refInput}
            placeholder={placeholder}
            selectedKey={selectedKey}
            onChange={(event: any, item: any) => onChangeOption(event, item)}
            options={props.options}
            styles={dropdownStyles}
            dropdownWidth="auto">
        </SearchableDropdown>
    );
});
