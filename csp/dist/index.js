window.addEventListener("securitypolicyviolation", console.error.bind(console));

const body = document.body;
body.innerHTML = 'abc';
