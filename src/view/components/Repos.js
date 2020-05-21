const Repos = (repoHtml, repoName, repoStars, repoWatchers, repoForks) => `
<ul>
  <li>
    <a href="${repoHtml}" target="_blank">${repoName}</a>
    <div>
    <span class="badge badge--green">Stars:${repoStars}</span>
    <span class="badge badge--blue">Watchers:${repoWatchers}</span>
    <span class="badge badge--grey">Forks:${repoForks}</span>
  </div>
  </li>

</ul>`;

export default Repos;
