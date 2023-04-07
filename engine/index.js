// Select all elements with the 'danchor' attribute and store them in the 'pc' constant
const pc = document.querySelectorAll('[danchor]');
 // Select the element with the 'dpages' tag and store it in the 'ps' constant
const ps = document.querySelector('dpages');
 // Add an event listener to each element with the 'danchor' attribute
pc.forEach(a => {
  // When the element is clicked, prevent the default link behavior
  a.onclick = e => {
    e.preventDefault();
    // Get the href attribute of the clicked element and prepend it with the 'DOMAIN' variable
    const l = `${DOMAIN}${a.getAttribute('href')}`;
    // Call the toPage function with the new URL
    toPage(l);
  }
});
 // If the URL includes the 'dx=' parameter
if (window.location.href.includes('dx=')) {
  // Create a new URLSearchParams object with the URL search params
  const urlParams = new URLSearchParams(window.location.search);
  // Get the value of the 'dx' parameter
  const myParam = urlParams.get('dx');
  // Call the toPage function with the new URL
  toPage(DOMAIN + myParam);
  // Delete the 'dx' parameter from the URL search params
  urlParams.delete('dx');
  // Add a '?' to the URL if it contains other search parameters, otherwise add nothing
  let q = window.location.href.includes('&') ? '?' : '';
  // Create a new URL with the updated search params
  let newUrl = window.location.origin + window.location.pathname + q + urlParams.toString();
  // Replace the current state in the browser history with the new URL
  history.replaceState(null, "", newUrl);
}
 // Define the 'toPage' function, which takes a URL as a parameter
function toPage(page) {
  // Remove the 'DOMAIN' variable from the URL
  const l = page.replace(DOMAIN, '');
  // Get the current URL path
  const old = window.location.pathname;
  // Replace the current URL path with the new path
  const nextURL = `${window.location.href.replace(old, page)}`;
  // Push the new URL to the browser history
  window.history.pushState({}, '', nextURL);
  // Fetch the contents of the new page URL
  fetch(`./pages${l}${l == '/' ? '' : VIEW_ENGINE}`)
    .catch(e => {
      // If the page is not found, redirect to the 404 page
      return window.location.pathname = DOMAIN + '/404'
    })
    .then(e => {
      // When the page is successfully fetched, get its text content
      e.text().then(v => {
        // Set the innerHTML of the 'dpages' element to the fetched content
        ps.innerHTML = v;
      })
    });
}
 // Add an event listener for when the user navigates through the browser history
window.onpopstate =e=>{
  // Get the current URL path
  const path = window.location.pathname;
  // Call the 'toPage' function with the current URL path
  toPage(path);
}
 // When the page is loaded
window.onload=e=>{
  // If the URL path is only the domain name, navigate to the home page
  if (window.location.pathname.replace(DOMAIN,'') == '/') toPage(DOMAIN+'/');
}