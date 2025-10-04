// Данные курсов с кодами стран для flag-icons
const data = {
  courses: [
    { language: "Russian", flag: "ru", levels: [
        { level: "Beginner (A1)", duration: "4 months", price: "$400", description: "Start learning Russian with the basics of grammar, vocabulary, and pronunciation." },
        { level: "Elementary (A2)", duration: "5 months", price: "$500", description: "Build on basic knowledge to handle simple communication." },
        { level: "Intermediate (B1)", duration: "6 months", price: "$600", description: "Develop confidence in Russian communication through practical conversation with native speakers." },
        { level: "Upper Intermediate (B2)", duration: "7 months", price: "$700", description: "Enhance fluency and comprehension in various contexts." },
        { level: "Advanced (C1)", duration: "8 months", price: "$800", description: "Achieve advanced Russian fluency for academic, professional, or cultural purposes." },
        { level: "Proficient (C2)", duration: "10 months", price: "$1000", description: "Achieve full mastery of Russian with native-level speaking, writing, and comprehension." }
      ]
    },
    { language: "English", flag: "gb", levels: [
        { level: "Beginner (A1)", duration: "4 months", price: "$400", description: "Learn essential English grammar and vocabulary for everyday situations." },
        { level: "Elementary (A2)", duration: "5 months", price: "$500", description: "Build on basic knowledge to handle simple communication." },
        { level: "Intermediate (B1)", duration: "6 months", price: "$600", description: "Improve fluency and accuracy in English through interactive practice." },
        { level: "Upper Intermediate (B2)", duration: "7 months", price: "$700", description: "Enhance fluency and comprehension in various contexts." },
        { level: "Advanced (C1)", duration: "8 months", price: "$800", description: "Develop strong academic and professional English communication skills." },
        { level: "Proficient (C2)", duration: "10 months", price: "$1000", description: "Reach native-like English proficiency for any context." }
      ]
    },
    { language: "Spanish", flag: "es", levels: [
        { level: "Beginner (A1)", duration: "4 months", price: "$400", description: "Learn basic Spanish vocabulary and grammar for everyday conversations." },
        { level: "Elementary (A2)", duration: "5 months", price: "$500", description: "Build on basic knowledge to handle simple communication." },
        { level: "Intermediate (B1)", duration: "6 months", price: "$600", description: "Strengthen Spanish communication skills and cultural understanding." },
        { level: "Upper Intermediate (B2)", duration: "7 months", price: "$700", description: "Enhance fluency and comprehension in various contexts." },
        { level: "Advanced (C1)", duration: "8 months", price: "$800", description: "Achieve advanced Spanish fluency for studies, work, and travel." },
        { level: "Proficient (C2)", duration: "10 months", price: "$1000", description: "Master Spanish at a native level, both spoken and written." }
      ]
    },
    { language: "French", flag: "fr", levels: [
        { level: "Beginner (A1)", duration: "4 months", price: "$400", description: "Learn essential French vocabulary, grammar, and pronunciation." },
        { level: "Elementary (A2)", duration: "5 months", price: "$500", description: "Build on basic knowledge to handle simple communication." },
        { level: "Intermediate (B1)", duration: "6 months", price: "$600", description: "Practice French conversations with native speakers." },
        { level: "Upper Intermediate (B2)", duration: "7 months", price: "$700", description: "Enhance fluency and comprehension in various contexts." },
        { level: "Advanced (C1)", duration: "8 months", price: "$800", description: "Develop advanced fluency for professional and academic contexts." },
        { level: "Proficient (C2)", duration: "10 months", price: "$1000", description: "Master French to communicate like a native speaker." }
      ]
    },
    { language: "German", flag: "de", levels: [
        { level: "Beginner (A1)", duration: "4 months", price: "$400", description: "Learn German basics for everyday communication." },
        { level: "Elementary (A2)", duration: "5 months", price: "$500", description: "Build on basic knowledge to handle simple communication." },
        { level: "Intermediate (B1)", duration: "6 months", price: "$600", description: "Develop German fluency for work and travel." },
        { level: "Upper Intermediate (B2)", duration: "7 months", price: "$700", description: "Enhance fluency and comprehension in various contexts." },
        { level: "Advanced (C1)", duration: "8 months", price: "$800", description: "Enhance German proficiency for academic and professional contexts." },
        { level: "Proficient (C2)", duration: "10 months", price: "$1000", description: "Achieve near-native mastery of German." }
      ]
    },
    { language: "Italian", flag: "it", levels: [
        { level: "Beginner (A1)", duration: "4 months", price: "$400", description: "Learn the basics of Italian grammar, vocabulary, and pronunciation." },
        { level: "Elementary (A2)", duration: "5 months", price: "$500", description: "Build on basic knowledge to handle simple communication." },
        { level: "Intermediate (B1)", duration: "6 months", price: "$600", description: "Practice Italian in real-life situations with native speakers." },
        { level: "Upper Intermediate (B2)", duration: "7 months", price: "$700", description: "Enhance fluency and comprehension in various contexts." },
        { level: "Advanced (C1)", duration: "8 months", price: "$800", description: "Achieve advanced fluency in Italian communication." },
        { level: "Proficient (C2)", duration: "10 months", price: "$1000", description: "Master Italian with full native-like proficiency." }
      ]
    },
    { language: "Japanese", flag: "jp", levels: [
        { level: "Beginner (A1)", duration: "5 months", price: "$450", description: "Learn the basics of Japanese writing, speaking, and listening." },
        { level: "Elementary (A2)", duration: "6 months", price: "$550", description: "Build on basic knowledge to handle simple communication." },
        { level: "Intermediate (B1)", duration: "7 months", price: "$650", description: "Develop Japanese conversation and reading skills with native materials." },
        { level: "Upper Intermediate (B2)", duration: "8 months", price: "$750", description: "Enhance fluency and comprehension in various contexts." },
        { level: "Advanced (C1)", duration: "9 months", price: "$850", description: "Achieve advanced fluency in Japanese for business and academics." },
        { level: "Proficient (C2)", duration: "11 months", price: "$1050", description: "Master Japanese for complete native-level proficiency." }
      ]
    },
    { language: "Chinese", flag: "cn", levels: [
        { level: "Beginner (A1)", duration: "5 months", price: "$450", description: "Start learning Chinese pronunciation, writing, and basic vocabulary." },
        { level: "Elementary (A2)", duration: "6 months", price: "$550", description: "Build on basic knowledge to handle simple communication." },
        { level: "Intermediate (B1)", duration: "7 months", price: "$650", description: "Improve fluency in spoken and written Chinese with native speakers." },
        { level: "Upper Intermediate (B2)", duration: "8 months", price: "$750", description: "Enhance fluency and comprehension in various contexts." },
        { level: "Advanced (C1)", duration: "9 months", price: "$850", description: "Develop strong fluency in Chinese for academic and professional use." },
        { level: "Proficient (C2)", duration: "11 months", price: "$1050", description: "Master Chinese to communicate like a native speaker." }
      ]
    },
    { language: "Arabic", flag: "sa", levels: [
        { level: "Beginner (A1)", duration: "5 months", price: "$450", description: "Learn Arabic basics: alphabet, pronunciation, and everyday expressions." },
        { level: "Elementary (A2)", duration: "6 months", price: "$550", description: "Build on basic knowledge to handle simple communication." },
        { level: "Intermediate (B1)", duration: "7 months", price: "$650", description: "Develop fluency in Arabic communication with practical conversations." },
        { level: "Upper Intermediate (B2)", duration: "8 months", price: "$750", description: "Enhance fluency and comprehension in various contexts." },
        { level: "Advanced (C1)", duration: "9 months", price: "$850", description: "Enhance your Arabic for academic and professional contexts." },
        { level: "Proficient (C2)", duration: "11 months", price: "$1050", description: "Achieve native-level mastery of Arabic." }
      ]
    },
    { language: "Portuguese", flag: "pt", levels: [
        { level: "Beginner (A1)", duration: "4 months", price: "$400", description: "Learn the basics of Portuguese grammar and conversation." },
        { level: "Elementary (A2)", duration: "5 months", price: "$500", description: "Build on basic knowledge to handle simple communication." },
        { level: "Intermediate (B1)", duration: "6 months", price: "$600", description: "Strengthen Portuguese skills through active practice with native speakers." },
        { level: "Upper Intermediate (B2)", duration: "7 months", price: "$700", description: "Enhance fluency and comprehension in various contexts." },
        { level: "Advanced (C1)", duration: "8 months", price: "$800", description: "Develop advanced Portuguese communication for professional use." },
        { level: "Proficient (C2)", duration: "10 months", price: "$1000", description: "Master Portuguese with full native-like fluency." }
      ]
    }
  ]
};

// Генерация списка курсов и select
const container = document.getElementById('courses-list');
const formSelect = document.getElementById('selectedCourse');

container.innerHTML = data.courses.map((course, langIndex) => {
  return course.levels.map((level, lvlIndex) => `
    <div class="course">
      <h3><span class="fi fi-${course.flag}"></span> ${course.language} – ${level.level}</h3>
      <p>${level.description}</p>
      <p><strong>Duration:</strong> ${level.duration}</p>
      <p><strong>Price:</strong> ${level.price}</p>
      <button onclick="openForm(${langIndex}, ${lvlIndex})">Sign Up</button>
    </div>
  `).join('');
}).join('');

// Заполняем select
data.courses.forEach((course, langIndex) => {
  course.levels.forEach((level, lvlIndex) => {
    const option = document.createElement('option');
    option.value = `${langIndex}-${lvlIndex}`;
    option.textContent = `${course.language} – ${level.level} (${level.price})`;
    formSelect.appendChild(option);
  });
});

// Функция открытия формы
window.openForm = function(langIndex, lvlIndex) {
  formSelect.value = `${langIndex}-${lvlIndex}`;
  const form = document.getElementById('registration-form');
  form.style.display = 'block';
  form.scrollIntoView({ behavior: 'smooth' });
};

// Отправка формы
document.getElementById('courseForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const [langIndex, lvlIndex] = formSelect.value.split('-').map(Number);
  const course = data.courses[langIndex];
  const level = course.levels[lvlIndex];
  const name = document.getElementById('name').value;

  alert(`Thank you, ${name}! You registered for "${course.language} – ${level.level}".`);
  this.reset();
  document.getElementById('registration-form').style.display = 'none';
});
