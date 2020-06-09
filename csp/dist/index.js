window.addEventListener("securitypolicyviolation", (err) => console.error(err));

const body = document.body;
body.innerHTML = '<img src=xyz.jpg>';
