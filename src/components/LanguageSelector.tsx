import React from "react";
import Select from 'react-select'


const LanguageSelector = ({selectedLanguages, setSelectedLanguages,languageNames, languageOptions}) => {
    return (
        <>
            <Select options={languageOptions} isMulti onChange={(e) => {
                let newobj = e;
                setSelectedLanguages(newobj);
            }} value={selectedLanguages}/>
        </>
    )
}


export default LanguageSelector;