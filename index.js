const wrapper = document.querySelector('.wrapper');

const createIssue = ({ user, title }) => {
  const issueBody = document.createElement('div');
  issueBody.classList.add('issue-body');

  issueBody.innerHTML = `
    <h4 class="issue-author">Login: ${user.login}</h4>
    <h5 class="issue-title">Issue: ${title}</h5>
  `;

  return issueBody;
};

getCatsImages = num => {
  const images = []
  for (let i = 0; i < num; i++) {
    images.push(`<img class="cat-image" src="./images/cat-${i + 1}.jpg"></img>`)
  };

  return images.join('');
}

const runApp = ({ wrapper }) => {
  const keyLogger = [];
  const konamiCode = 'injects3crets';

  wrapper.innerHTML = `
    <h1>Sweet Kittens</h1>
    ${getCatsImages(8)}
  `;

const runTimer = delay => setTimeout(
  () => {
    keyLogger.length = 0
  }, delay
);

let timer;
window.addEventListener('keydown', e => {
  if (timer) {
    clearTimeout(timer);
  }

  timer = runTimer(3000);

  if (e.key === 'Escape') {
    keyLogger.length = 0;
  }

  if (/^[a-zA-Z0-9]/g.test(e.key) && e.key.length === 1) {
    keyLogger.push(e.key)
  
    if (keyLogger.join('') === konamiCode) {
      fetch('https://api.github.com/repos/elixir-lang/elixir/issues')
        .then(response => response.json())
        .then(data => data.sort(({ created_at: a }, { created_at: b }) => Date.parse(a) < Date.parse(b) ? 1 : Date.parse(a) > Date.parse(b) ? -1 : 0))
        .then(data => {
          wrapper.innerHTML = '';

          for (let i = 0; i < 6; i++) {
            const issue = createIssue(data[i]);
            wrapper.appendChild(issue);
            wrapper.style.flexDirection = 'column';

            setTimeout(() => {
              wrapper.style.flexDirection = 'row';
              wrapper.innerHTML = `
                <h1>Sweet Kittens</h1>
                ${getCatsImages(8)}
              `;
            }, 15000)
          }
        })
    }
  }
})

}

runApp({ wrapper });