import React from "react";

function SaveButton(props) {
  async function saveProject(e) {
    e.preventDefault();

    // This will send a post request to update the data in the database.
    const response = await fetch(`http://localhost:5050/projects/${props.project.projectId}`, {
      method: "PATCH",
      body: JSON.stringify(props.project),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // This will send a post request to update the data in the database.
    const response2 = await fetch(`http://localhost:5050/users/${props.user._id}`, {
      method: "PATCH",
      body: JSON.stringify(props.user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(response);
  }

  return <div id="saveButton" onClick={saveProject}>Save</div>;
}

export default SaveButton;
