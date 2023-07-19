import React, { useState } from "react";

function SideBarHeader() {
  const [projectTitle, setProjectTitle] = useState("Project Name");

  function submitTitle(event) {
    const newTitle = event.target.value;
    setProjectTitle(newTitle);
  }

  return (
    <div id="sideBarHeader">
      <input
        id="projectName"
        value={projectTitle}
        type="text"
        name="projectName"
        onChange={submitTitle}
      />
    </div>
  );
}

export default SideBarHeader;
