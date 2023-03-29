import React, { useEffect } from "react"
import { useState } from "react";
import axios from "axios";
import LanguageSelector from "./LanguageSelector.tsx";


const DetectionField = () => {
    const [fieldInput, setFieldInput] = useState("");
    let languageNames = new Intl.DisplayNames(["en"], { type: "language" });
    const [predictedLanguage, setPredictedLanguage] = useState("");
    const [selectedLanguages, setSelectedLanguages] = useState([
        { value: 'en', label: 'English' },
        { value: 'de', label: "German" },
        { value: 'fr', label: "French" },
        { value: 'it', label: "Italian" }
    ]);

    const [languageOptions, setLanguageOptions] = useState([]);

    useEffect(() => 
    {
        axios.get("https://fronted-assessment-api.icywater-ce6703fd.switzerlandnorth.azurecontainerapps.io/languages/detectable")
        .then(response => 
            {
                let obj = response.data;
                let newLanguageOptions = [];
                obj.languages.forEach((item) => 
                {
                    newLanguageOptions.push({value: item.code, label: languageNames.of(item.code)});
                })
                setLanguageOptions(newLanguageOptions);
            })
    } )
    function analyzeText(e) {
        setFieldInput(e.target.value);

        let url_ = new URL('https://fronted-assessment-api.icywater-ce6703fd.switzerlandnorth.azurecontainerapps.io/language');
        url_.searchParams.append("text", fieldInput);
        selectedLanguages.forEach(element => {
            url_.searchParams.append("detectable", element.value);
        });
        axios.get(url_)
            .then(response => {
                let res_obj = response.data;
                setPredictedLanguage(languageNames.of(res_obj.language.code));
            }).catch(err => {
                console.log("Request not succesful");
                setPredictedLanguage("Cannot identify a language");
            })
    }
    return (
        <>
            <center>
                <h1>Detect your text language</h1>
                <br />
                <input onChange={analyzeText} value={fieldInput} />
                <h2>You probably wrote in {predictedLanguage}</h2>
                <LanguageSelector setSelectedLanguages={setSelectedLanguages} languageNames={languageNames} languageOptions={languageOptions} />
            </center>
        </>
    )
}


export default DetectionField;