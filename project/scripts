fetch('data/courses.json')
.then(response => response.json())
.then(data => {
    const container = document.getElementById('courses-container');

    data.courses.forEach(course => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${course.language}</h3>
            <p>${course.level}</p>
            <p>${course.duration}</p>
            <p>${course.price}</p>
            <button class="details-btn">Details</button>
        `;
        container.appendChild(card);

        // Открыть модальное окно при клике на Details
        card.querySelector('.details-btn').addEventListener('click', () => {
            document.getElementById('modal-language').textContent = course.language;
            document.getElementById('modal-level').textContent = course.level;
            document.getElementById('modal-duration').textContent = course.duration;
            document.getElementById('modal-price').textContent = course.price;
            document.getElementById('modal-description').textContent = course.description;
            document.getElementById('course-modal').style.display = 'block';
        });
    });
});

// Закрытие модального окна
document.getElementById('close-course').onclick = () => {
    document.getElementById('course-modal').style.display = 'none';
};
window.onclick = event => {
    if (event.target === document.getElementById('course-modal')) {
        document.getElementById('course-modal').style.display = 'none';
    }
};
