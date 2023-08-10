import React, { useState } from "react";

function SideBarHeader(props) {
  const [projectTitle, setProjectTitle] = useState(props.project.title);

  function submitTitle(event) {
    const newTitle = event.target.value;

    props.setProject((prev) => {
      const imageURL = document.getElementById("canvas").toDataURL();
      console.log(props.project);
      console.log(props.user.projects);
      props.setUser(() => {
        const newItem = {...props.project, title: newTitle };
        if (props.user.projects.length > 1) {
          const newArray = props.user.projects.filter(
            (proj) => proj._id !== props.project._id
          );
          return {
            ...props.user,
            projects: [newItem, ...newArray],
          };
        } else {
          console.log(props.project._id);
          return {
            ...props.user,
            projects: [newItem],
          };
        }
      });

      return { ...prev, image: imageURL, title: newTitle };
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
