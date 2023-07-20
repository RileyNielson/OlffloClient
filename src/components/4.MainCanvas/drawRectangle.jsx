function drawRectangle(props) {
  const canvas = document.getElementById("canvas");
  if (props) {
    const ctx = canvas.getContext("2d");

    ctx.fillRect(50, 50, 50, 50);
  }
}

export default drawRectangle;
