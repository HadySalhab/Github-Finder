const User = (
	imageUrl,
	company,
	blog,
	location,
	createdAt,
	totalRepos,
	gists,
	followers,
	following,
	userHtml,
	isSavedUser
) => `<div class="user__details">
<div class="user__image">
  <img  src="${imageUrl}" alt="User Image">
</div>

  <div class="user__summary">
  <ul>
    <li>Company: ${company}</li>
    <li>Website/blog: ${blog}</li>
    <li>Location: ${location}</li>
    <li>Member Since: ${createdAt}</li>
  </ul>
  <div class="user__btns">
  <a href="#"  target="_blank" class="btn btn--red">${
		isSavedUser ? "Unfollow User" : "Follow User"
	}</a>
  <a href="${userHtml}" target="_blank" class="btn btn--blue">View Profile</a>
</div>
</div>
</div>
  <div class="user__repos">
    <span class="badge badge--red">Public Repos: ${totalRepos}</span>
    <span class="badge badge--grey">Public Gists: ${gists}</span>
    <span class="badge badge--green">Followers: ${followers}</span>
    <span class="badge badge--blue">Following: ${following}</span>
  </div>
  `;

export default User;
