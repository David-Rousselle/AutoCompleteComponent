# AutoCompleteComponent

it's for ag-grid, here is how i use it :

cellEditor: AutoCompleteComponent,

cellEditorParams: (params: any) => {

    return {
    
        options: projects,
        
        selectedKey: params.data.projectId,
        
        placeholder: strings.SelectProject
        
    }
    
},
