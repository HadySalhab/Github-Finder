const NextButton = (page) => `
<button class="btn-inline btn-inline--right" data-goto=${page}>
<span>Page ${page}</span>
<i class="fas fa-caret-right"></i>
</button>
   `;

const PrevButton = (page) => `
   <button class="btn-inline btn-inline--left" data-goto=${page}>
   <i class="fas fa-caret-left "></i>
   <span>Page ${page}</span>
   </button>
      `;

export { NextButton, PrevButton };
