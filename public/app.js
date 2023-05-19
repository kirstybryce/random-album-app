console.log("I am alive :)");

window.addEventListener("load", (event) => {
  console.log("page is fully loaded");
  const button = document.getElementById("btn");
  const myText = document.getElementById("text");
  button.onclick = () => {
    fetch("/example")
      .then((response) => response.text())
      .then((text) => {
        myText.innerHTML = text;
      });
  };
});
