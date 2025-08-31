(function(){
  const container = document.getElementById('courses');
  const creditsOut = document.getElementById('total-credits');
  const buttons = document.querySelectorAll('.filter-button');

  let data = Array.isArray(window.courses) ? window.courses.slice() : [];

  function render(list){
    if (!container) return;
    container.innerHTML = '';
    list.forEach(course => {
      const card = document.createElement('article');
      card.className = 'course' + (course.completed ? ' completed' : '');
      card.innerHTML = `
        <h3>${course.code} — ${course.title}</h3>
        <p class="meta"><span>${course.prefix}</span> · <span>${course.credits} credits</span></p>
      `;
      container.appendChild(card);
    });
    const total = list.reduce((sum, c) => sum + (Number(c.credits)||0), 0);
    if (creditsOut) creditsOut.textContent = total;
  }

  function setPressed(targetBtn){
    buttons.forEach(b => b.setAttribute('aria-pressed', b === targetBtn ? 'true' : 'false'));
  }

  function filterBy(type){
    if (type === 'WDD') return data.filter(c => c.prefix === 'WDD');
    if (type === 'CSE') return data.filter(c => c.prefix === 'CSE');
    return data;
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      setPressed(btn);
      render(filterBy(btn.dataset.filter));
    });
  });

  render(data);
})();
