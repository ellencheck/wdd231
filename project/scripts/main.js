const teachers = [
  {
    "name": "Alina Chekalova",
    "language": "Russian",
    "city": "Moscow",
    "country": "Russia",
    "education": "Moscow State University, Teaching Russian as a Foreign Language",
    "experience": "8 years teaching Russian to international students online and in language schools in Moscow",
    "bio": "Passionate about helping students master Russian with engaging lessons.",
    "photo": "images/alina-chekalova.jpg"
  },
  {
    "name": "Ellen Chek",
    "language": "English",
    "city": "Boise",
    "country": "Idaho, USA",
    "education": "TESOL Certificate, Brigham Young University (BYU)",
    "experience": "7 years teaching English online and in language institutes to non-native speakers",
    "bio": "Makes learning English practical and enjoyable, preparing students for real-life communication.",
    "photo": "images/ellen-chek.jpg"
  },
  {
    "name": "Elsa Lopez",
    "language": "Spanish",
    "city": "Madrid",
    "country": "Spain",
    "education": "Universidad Complutense de Madrid, Spanish Philology",
    "experience": "6 years teaching Spanish as a foreign language online and in Spain",
    "bio": "Brings Spanish culture into every lesson, making it immersive and fun.",
    "photo": "images/elsa-lopez.png"
  }
  // ... остальные учителя
];

const teachersList = document.getElementById('teachers-list');

teachers.forEach(teacher => {
  const card = document.createElement('div');
  card.className = 'teacher-card';

  const img = document.createElement('img');
  img.src = teacher.photo;
  img.alt = teacher.name;
  img.loading = 'lazy';

  const h3 = document.createElement('h3');
  h3.textContent = teacher.name;

  const p = document.createElement('p');
  p.textContent = `${teacher.language} Teacher — ${teacher.bio}`;

  card.appendChild(img);
  card.appendChild(h3);
  card.appendChild(p);

  teachersList.appendChild(card);
});

