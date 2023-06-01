const form = document.getElementById('updateForm');

// GET isteği ile mevcut verileri al
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

fetch(`http://127.0.0.1:8000/home/iha/${id}`)
  .then(response => response.json())
  .then(data => {
    // Verileri form alanlarına yerleştir
    document.getElementById('name').value = data.name;
    document.getElementById('brand').value = data.brand;
    document.getElementById('model').value = data.model;
    document.getElementById('weight').value = data.weight;    
    document.getElementById('description').value = data.description;
    // document.getElementById('image').value = data.image;
    document.getElementById('category').value = data.category;
    document.getElementById('country').value = data.country;
   
  })
  .catch(error => {
    console.log('Veri alımında bir hata oluştu:', error);
    // Hata durumunda gerekli işlemleri burada yapabilirsiniz
  });

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const brand = document.getElementById('brand').value;
  const model = document.getElementById('model').value;
  const weight = document.getElementById('weight').value;
  
  const description = document.getElementById('description').value;
  const category = document.getElementById('category').value;
  const country = document.getElementById('country').value;

  const formData = new FormData();
  formData.append('name', name);
  formData.append('brand', brand);
  formData.append('model', model);
  formData.append('weight', weight);
  
  formData.append('description', description);
  formData.append('category', category);
  formData.append('country', country);
  const imageInput = document.getElementById('image');
  if (imageInput.files.length > 0) {
    const image = imageInput.files[0];
    formData.append('image', image);
  }

  fetch(`http://127.0.0.1:8000/home/iha/${id}`, {
    method: 'PUT',
    body: formData
  })
    .then(response => {
      if (response.ok) {
        console.log('Veri başarıyla gönderildi.');
        // Başarılı olursa gerekli işlemleri burada yapabilirsiniz
      } else {
        console.log('Veri gönderme hatası:', response.status);
        // Hata durumunda gerekli işlemleri burada yapabilirsiniz
      }
    })
    .catch(error => {
      console.log('Bir hata oluştu:', error);
      // Hata durumunda gerekli işlemleri burada yapabilirsiniz
    });
});
