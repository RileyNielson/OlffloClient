import React, { useState } from "react";

function SideBarHeader(props) {
  const [projectTitle, setProjectTitle] = useState(props.project.title);

  function submitTitle(event) {
    const newTitle = event.target.value;

    props.setProject((prev) => {
      props.setUser((prev) => {

        const newProjectsArray = props.user.projects.map((p) => {
          if (p._id === props.project._id) {
            return ({...p, title: newTitle});
          } else {
            return {...p};
          }
        });

        return {
          ...prev,
          projects: newProjectsArray,
        };
      });

      return { ...prev, title: newTitle };
    });

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
