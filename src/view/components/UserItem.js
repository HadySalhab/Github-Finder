const UserItem = (imageUrl, userName) => `
<div class="results__item">
<img src="${imageUrl}" alt="User Image">
<p>${userName}</p>
</div>
`;

export default UserItem;
