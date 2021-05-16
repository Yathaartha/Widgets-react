import React, { useState, useEffect } from "react";
import axios from "axios";

const Convert = ({ language, text }) => {
  const [translated, setTranslated] = useState("");
  const [debouncedText, setDebouncedText] = useState(text);
  const [debouncedlanguage, setDebouncedlanguage] = useState(language.value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedText(text);
      setDebouncedlanguage(language.value);
    }, 200);

    return () => {
      clearTimeout(timerId);
    };
  }, [language, text]);

  useEffect(() => {
    const doTranslation = async () => {
      const { data } = await axios.post(
        "https://translation.googleapis.com/language/translate/v2",
        {},
        {
          params: {
            q: debouncedText,
            target: debouncedlanguage,
            key: "AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM",
          },
        }
      );

      setTranslated(data.data.translations[0].translatedText);
    };

    doTranslation();
  }, [debouncedText, debouncedlanguage]);

  return (
    <div>
      <h1 className="ui header">{translated}</h1>
    </div>
  );
};

export default Convert;
