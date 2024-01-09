import React from "react";

export const AboutMe = ({ label, description }) => {
 return  (<section className="profile section" id="profile">
    <h2 className="section-title">{label}</h2>
    {description.map(i=><p className="profile__description">{i}</p>)}
  </section>

);
}
