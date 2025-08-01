function includeHTML(selector, url) {
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`Could not fetch ${url}`);
        return res.text();
      })
      .then(data => {
        document.querySelector(selector).innerHTML = data;
      })
      .catch(err => console.error(err));
  }
  
  window.addEventListener('DOMContentLoaded', () => {
    includeHTML('#header', 'include/header.html');
    includeHTML('#footer', 'include/footer.html');
  });
  