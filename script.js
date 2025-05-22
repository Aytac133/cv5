function toggleSection(selector, button) {
  const section = document.querySelector(selector);
  const elems = section.querySelectorAll('p, li');
  const allHidden = Array.from(elems).every(el => window.getComputedStyle(el).display === 'none');

  elems.forEach(el => {
    el.style.display = allHidden ? 'block' : 'none';
  });

  button.textContent = allHidden ? 'Gizlət' : 'Göstər';
}

function toggleContact() {
  toggleSection('.contact', document.querySelector('.contact button'));
}

function toggleEducation() {
  toggleSection('.education', document.querySelector('.education button'));
}

function toggleSkills() {
  toggleSection('.skills', document.querySelector('.skills button'));
}

function toggleLanguages() {
  toggleSection('.languages', document.querySelector('.languages button'));
}

function toggleTechnical() {
  toggleSection('.reference', document.querySelector('.reference button'));
}

function filterLanguages() {
  const input = document.getElementById('languageSearch').value.toLowerCase();
  const languages = document.querySelectorAll('.languages p');

  languages.forEach(lang => {
    lang.style.display = lang.textContent.toLowerCase().includes(input) ? 'block' : 'none';
  });
}

function toggleEditing(button) {
  const section = button.parentElement;
  const editableElements = section.querySelectorAll('p, li');
  const isEditing = button.classList.contains('edit-toggle-active');

  if (isEditing) {
    editableElements.forEach(el => {
      el.contentEditable = 'false';
      el.classList.remove('editable');
      el.style.border = 'none';
    });
    button.classList.remove('edit-toggle-active');
    button.textContent = 'Redaktəni Aktivləşdir';
    validateAndSave();
  } else {
    editableElements.forEach(el => {
      el.contentEditable = 'true';
      el.classList.add('editable');
      el.style.border = '1px solid #4a90e2';
      el.addEventListener('blur', validateAndSave);
    });
    button.classList.add('edit-toggle-active');
    button.textContent = 'Redaktəni Söndür';
  }
}

function saveToLocalStorage() {
  const editableElements = document.querySelectorAll('p, li');
  const data = [];

  editableElements.forEach((el, index) => {
    data.push({
      index,
      content: el.innerText.trim()
    });
  });

  localStorage.setItem('cvData', JSON.stringify(data));
  console.log('Məlumat yadda saxlanıldı!');
}

function loadFromLocalStorage() {
  const storedData = JSON.parse(localStorage.getItem('cvData'));
  if (storedData) {
    const editableElements = document.querySelectorAll('p, li');
    storedData.forEach((item, i) => {
      if (editableElements[i]) {
        editableElements[i].innerText = item.content;
      }
    });
  }
}

function validateAndSave() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let isValid = true;
  const editableElements = document.querySelectorAll('p, li');

  editableElements.forEach(el => {
    el.style.border = 'none';
    const text = el.innerText.trim();

    if (!text) {
      el.style.border = '2px solid red';
      isValid = false;
    }

    if (text.includes('@') && !emailRegex.test(text)) {
      el.style.border = '2px solid red';
      isValid = false;
    }
  });

  if (isValid) {
    saveToLocalStorage();
  } else {
    alert("Zəhmət olmasa, bütün sahələri düzgün doldurun.");
  }
}

function populateDataFromJSON(data) {
  // Profil
  document.querySelector('.profile-name').textContent = data.profile.name;
  document.querySelector('.profile-position').textContent = data.profile.position;

  // Əlaqə
  const contactDiv = document.querySelector('.contact-content');
  contactDiv.innerHTML = '';
  data.contact.forEach(item => {
    const p = document.createElement('p');
    p.textContent = item;
    contactDiv.appendChild(p);
  });

  // Təhsil
  const eduDiv = document.querySelector('.education-content');
  eduDiv.innerHTML = '';
  data.education.forEach(item => {
    const p = document.createElement('p');
    p.textContent = item;
    eduDiv.appendChild(p);
  });

  // Bacarıqlar
  const skillsUl = document.querySelector('.skills-content');
  skillsUl.innerHTML = '';
  data.skills.forEach(skill => {
    const li = document.createElement('li');
    li.textContent = skill;
    skillsUl.appendChild(li);
  });

  // Dillər
  const langDiv = document.querySelector('.languages-content');
  langDiv.innerHTML = '';
  data.languages.forEach(lang => {
    const p = document.createElement('p');
    p.textContent = lang;
    langDiv.appendChild(p);
  });

  // Texniki məlumatlar (references)
  const refUl = document.querySelector('.reference-content');
  refUl.innerHTML = '';
  data.reference.forEach(ref => {
    const li = document.createElement('li');
    li.textContent = ref;
    refUl.appendChild(li);
  });
}

// DOM yüklənəndə həm JSON-dan məlumat, həm də localStorage yüklənir
window.addEventListener('DOMContentLoaded', () => {
  // Əvvəl JSON-dan yüklə
  fetch('data.json')
    .then(res => res.json())
    .then(data => {
      populateDataFromJSON(data);
      // Sonra localStorage varsa üstün tut
      loadFromLocalStorage();
    })
    .catch(err => console.error('JSON yükləmə xətası:', err));
});
