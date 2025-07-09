
import React from "react";
import WrapperMain from "../components/wrapper/WrapperMain";

import { Language } from "../components/widget/language";
import LanguageCard from "../components/LanguageCard";

function documentation() {
  return (
    <WrapperMain>
      <div className="mb-5">
        <h1 className="text-3xl font-bold my-5">Tutoriels d&apos;installation </h1>
        <p className="text-xl">
          Voir des exemples de configuration de reportBug et sur différents
          frameworks et language.
        </p>
      </div>
   <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-6">
  {Language.map((link, index) => (
  <LanguageCard image={link.image} label={link.label} href={link.href} key={index} />
  ))}
</div>


    </WrapperMain>
  );
}

export default documentation;
