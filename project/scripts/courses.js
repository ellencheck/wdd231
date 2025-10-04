// scripts/courses.js
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('courses-list');
  const formSelect = document.getElementById('selectedCourse');

  if (!container) {
    console.error('No #courses-list element found on page.');
    return;
  }

  fetch('data/courses.json')
    .then(res => {
      if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
      return res.json();
    })
    .then(data => {
      if (!data || !Array.isArray(data.courses)) throw new Error('Invalid JSON: missing "courses" array');
      console.log(`Loaded ${data.courses.length} courses (top-level entries).`);

      container.innerHTML = ''; // убираем "Loading..."
      if (formSelect) formSelect.innerHTML = '';

      // Создаём карточки (каждый уровень — отдельная карточка)
      data.courses.forEach((course, langIndex) => {
        const courseFlagRaw = course.flag; // не меняем JSON
        const countryCode = getCountryCode(courseFlagRaw); // ru, gb, etc. или null
        course.levels && course.levels.forEach((level, lvlIndex) => {
          const card = document.createElement('div');
          card.className = 'course';

          const flagHtml = countryCode
            ? `<span class="fi fi-${countryCode}" aria-hidden="true"></span>`
            : `<span class="flag-emoji" aria-hidden="true">${escapeHtml(String(courseFlagRaw || ''))}</span>`;

          card.innerHTML = `
            <h3>${flagHtml} ${escapeHtml(course.language)} — ${escapeHtml(level.level)}</h3>
            <p>${escapeHtml(level.description)}</p>
            <p><strong>Duration:</strong> ${escapeHtml(level.duration)}</p>
            <p><strong>Price:</strong> ${escapeHtml(level.price)}</p>
            <button type="button" class="register-btn">Sign Up</button>
          `;

          // кнопка открытия формы
          card.querySelector('.register-btn').addEventListener('click', () => {
            openForm(langIndex, lvlIndex);
          });

          container.appendChild(card);

          // опция в select (текстово — потому что <option> не поддерживает HTML reliably)
          if (formSelect) {
            const opt = document.createElement('option');
            opt.value = `${langIndex}-${lvlIndex}`;
            // в option ставим эмодзи, если есть; иначе двухбуквенный код или пусто
            const optFlagText = countryCode ? '' : (courseFlagRaw || '');
            opt.textContent = `${optFlagText} ${course.language} — ${level.level} (${level.price})`.trim();
            formSelect.appendChild(opt);
          }
        });
      });

      // Открытие формы
      window.openForm = function(langIndex, lvlIndex) {
        if (!formSelect) return;
        formSelect.value = `${langIndex}-${lvlIndex}`;
        const form = document.getElementById('registration-form');
        if (form) {
          form.style.display = 'block';
          form.scrollIntoView({ behavior: 'smooth' });
        }
        updateSelectedFlagPreview();
      };

      // Показываем превью флага рядом с select (не трогает JSON)
      if (formSelect) {
        formSelect.addEventListener('change', updateSelectedFlagPreview);
      }
      function updateSelectedFlagPreview() {
        if (!formSelect) return;
        let preview = document.getElementById('selected-flag-preview');
        if (!preview) {
          preview = document.createElement('span');
          preview.id = 'selected-flag-preview';
          preview.style.marginLeft = '8px';
          formSelect.parentNode.insertBefore(preview, formSelect.nextSibling);
        }
        const val = formSelect.value;
        if (!val) { preview.innerHTML = ''; return; }
        const [li, lj] = val.split('-').map(Number);
        const course = data.courses[li];
        if (!course) { preview.innerHTML = ''; return; }
        const code = getCountryCode(course.flag);
        preview.innerHTML = code ? `<span class="fi fi-${code}" aria-hidden="true"></span>` : `<span class="flag-emoji">${escapeHtml(String(course.flag||''))}</span>`;
      }

      // отправка формы
      const courseForm = document.getElementById('courseForm');
      if (courseForm) {
        courseForm.addEventListener('submit', function(e) {
          e.preventDefault();
          if (!formSelect) { alert('Please select a course'); return; }
          const val = formSelect.value;
          if (!val) { alert('Please select a course'); return; }
          const [li, lj] = val.split('-').map(Number);
          const course = data.courses[li];
          const level = course && course.levels && course.levels[lj];
          if (!course || !level) { alert('Course not found'); return; }
          const name = document.getElementById('name') ? document.getElementById('name').value.trim() : '';
          const code = getCountryCode(course.flag);
          const flagText = code ? '' : (course.flag || '');
          alert(`Спасибо, ${name || 'student'}! Вы записаны на "${flagText} ${course.language} — ${level.level}".`);
          this.reset();
          const formSection = document.getElementById('registration-form');
          if (formSection) formSection.style.display = 'none';
        });
      }

    })
    .catch(err => {
      console.error('Error loading courses:', err);
      container.textContent = 'Failed to load courses. Open DevTools → Network to see why.';
    });

  // --- вспомогательные функции ---

  // Преобразует эмодзи-флаг (или 2-буквенный код) в lowercase ISO-код 'ru','gb' и т.д.
  function getCountryCode(flagRaw) {
    if (!flagRaw) return null;
    const s = String(flagRaw).trim();

    // если уже 2 буквы
    if (/^[A-Za-z]{2}$/.test(s)) return s.toLowerCase();

    // возможен формат like 'gb', 'GB' with spaces
    const first2 = s.slice(0,2);
    if (/^[A-Za-z]{2}$/.test(first2)) return first2.toLowerCase();

    // regional indicator symbols -> country code
    const cps = [];
    for (const ch of s) {
      const cp = ch.codePointAt(0);
      if (cp >= 0x1F1E6 && cp <= 0x1F1FF) cps.push(cp);
    }
    if (cps.length >= 2) {
      const A = String.fromCharCode(cps[0] - 0x1F1E6 + 65);
      const B = String.fromCharCode(cps[1] - 0x1F1E6 + 65);
      return (A + B).toLowerCase();
    }

    return null;
  }

  function escapeHtml(str) {
    return String(str || '').replace(/[&<>"']/g, ch => {
      return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]);
    });
  }
});
