const jsonData = {
    "profile": {
      "name": "Xəlilova Aytac Elşən qızı",
      "phone": "055273****",
      "position": "Nüfuzetmə sınaqçısı"
    },
    "contact": ["055273****", "xlilova********@gmail.com"],
    "education": [
      "2013-2024\n209 nömrəli məktəb",
      "2024-2028\nAzərbaycan texniki universiteti"
    ],
    "skills": [
      "Lahiyə idarəetməsi",
      "Qrup işi",
      "Solution problems",
      "Kritik düşünmə",
      "Empatiya"
    ],
    "languages": [
      "Turkish(Fluent)",
      "Azerbaijan(Fluent)",
      "Russian(Basics)",
      "English(Intermediate)"
    ],
    "experience": ["Yoxdur"],
    "reference": [
      "Hal-hazırda tələbəyəm.",
      "Kali Linux mühitində işləmişəm.",
      "Maltego və digər OSİNT alətlərindəndən istifadə etmişəm.",
      "C++ dilində orta səviyyədəyəm.",
      "İlkin software bilikləri tanışam."
    ]
  };
  
  // Məlumatları doldurmaq üçün funksiya
  function populateDataFromJSON(data) {
    // Profil məlumatları
    document.querySelector('main h1 .profile-name').textContent = data.profile.name || '';
    document.querySelector('main h2.profile-position').textContent = data.profile.position || '';
    document.querySelector('section.profile strong.profile-name').textContent = data.profile.name || '';
    document.querySelector('section.profile span.profile-phone').textContent = data.profile.phone || '';
  
    // Əlaqə
    const contactDiv = document.querySelector('.contact .contact-content');
    contactDiv.innerHTML = '';
    data.contact.forEach(item => {
      const p = document.createElement('p');
      p.textContent = item;
      contactDiv.appendChild(p);
    });
  
    // Təhsil
    const eduDiv = document.querySelector('.education .education-content');
    eduDiv.innerHTML = '';
    data.education.forEach(item => {
      const p = document.createElement('p');
      p.innerHTML = item.replace(/\n/g, '<br>');
      eduDiv.appendChild(p);
    });
  
    // Bacarıqlar
    const skillsUl = document.querySelector('.skills ul.skills-content');
    skillsUl.innerHTML = '';
    data.skills.forEach(skill => {
      const li = document.createElement('li');
      li.textContent = skill;
      skillsUl.appendChild(li);
    });
  
    // Dillər
    const langDiv = document.querySelector('.languages .languages-content');
    langDiv.innerHTML = '';
    data.languages.forEach(lang => {
      const p = document.createElement('p');
      p.textContent = lang;
      langDiv.appendChild(p);
    });
  
    // İş təcrübəsi
    const expDiv = document.querySelector('.experience .experience-content');
    expDiv.innerHTML = '';
    data.experience.forEach(exp => {
      const p = document.createElement('p');
      p.textContent = exp;
      expDiv.appendChild(p);
    });
  
    // Texniki biliklər (reference)
    const refUl = document.querySelector('.reference ul.reference-content');
    refUl.innerHTML = '';
    data.reference.forEach(ref => {
      const li = document.createElement('li');
      li.textContent = ref;
      refUl.appendChild(li);
    });
  }
  
  // Səhifə yüklənəndə məlumatları doldur
  window.addEventListener('DOMContentLoaded', () => {
    populateDataFromJSON(jsonData);
  });
   
  // Toggle funksiyaları (bölmələri gizlət/göstər)
  function toggleContact() {
    const el = document.querySelector('.contact .contact-content');
    el.style.display = el.style.display === 'none' ? 'block' : 'none';
  }
  function toggleEducation() {
    const el = document.querySelector('.education .education-content');
    el.style.display = el.style.display === 'none' ? 'block' : 'none';
  }
  function toggleSkills() {
    const el = document.querySelector('.skills ul.skills-content');
    el.style.display = el.style.display === 'none' ? 'block' : 'none';
  }
  function toggleLanguages() {
    const el = document.querySelector('.languages .languages-content');
    el.style.display = el.style.display === 'none' ? 'block' : 'none';
  }
  function toggleTechnical() {
    const el = document.querySelector('.reference ul.reference-content');
    el.style.display = el.style.display === 'none' ? 'block' : 'none';
  }
  
  // Dil axtarışı funksiyası
  function filterLanguages() {
    const input = document.getElementById('languageSearch');
    const filter = input.value.toLowerCase();
    const container = document.querySelector('.languages .languages-content');
    const paragraphs = container.getElementsByTagName('p');
  
    for (let i = 0; i < paragraphs.length; i++) {
      const txtValue = paragraphs[i].textContent || paragraphs[i].innerText;
      paragraphs[i].style.display = txtValue.toLowerCase().indexOf(filter) > -1 ? '' : 'none';
    }
  }
  
  // Redaktəni aktivləşdirmək üçün funksiya
  function toggleEditing(button) {
    const section = button.parentElement;
    const editableElems = section.querySelectorAll('p, span, strong, li');
  
    editableElems.forEach(el => {
      if (el.contentEditable === 'true') {
        el.contentEditable = 'false';
        el.style.border = 'none';
        el.style.padding = '0';
      } else {
        el.contentEditable = 'true';
        el.style.border = '1px solid #999';
        el.style.padding = '2px';
      }
    });
  
    // Düymə mətni dəyişir
    if (button.textContent.includes('Aktivləşdir')) {
      button.textContent = 'Redaktəni Bağla';
      button.classList.add('editing');
    } else {
      button.textContent = 'Redaktəni Aktivləşdir';
      button.classList.remove('editing');
    }
  }
  
  // Bütün məlumatları sıfırlamaq üçün
  function resetAll() {
    document.querySelectorAll('p, span, strong, li').forEach(el => {
      el.textContent = '';
    });
  }
  
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
