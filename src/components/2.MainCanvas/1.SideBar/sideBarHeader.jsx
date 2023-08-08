import React, { useState } from "react";

function SideBarHeader(props) {
  const [projectTitle, setProjectTitle] = useState(props.project.title);

  function submitTitle(event) {
    const newTitle = event.target.value;

    props.setProject((prev) => {
      console.log(props.project);
      console.log(props.user.projects);
      props.setUser(() => {
        const newItem = { title: newTitle, projectId: props.project._id };
        if (props.user.projects.length > 1) {
          const newArray = props.user.projects.filter(
            (proj) => proj.id !== props.project._id
          );

          return {
            ...props.user,
            projects: newArray.push(newItem),
          };
        } else {
          return {
            ...props.user,
            projects: [newItem],
          };
        }
      });

      return { ...prev, title: newTitle };
    });

    setProjectTitle(newTitle);
  }

  console.log(props.project);

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
