window.addEventListener("securitypolicyviolation", (err) => console.error(err));

if (window.trustedTypes && trustedTypes.createPolicy) {
  const escapedHTMLPolicy = trustedTypes.createPolicy("myEscapePolicy", {
    createHTML: (string) => string.replace(/\</g, "&lt;"),
  });

  const escaped = escapedHTMLPolicy.createHTML("<img src=xyz.jpg>");
  console.log(escaped instanceof TrustedHTML);

  const body = document.body;
  body.innerHTML = escaped;
}
