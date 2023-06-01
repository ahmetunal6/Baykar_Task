const form = document.getElementById('myForm');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  // Formdaki giriş alanlarından değerleri alıyoruz
  const name = document.getElementById('name').value;
  const brand = document.getElementById('brand').value;
  const model = document.getElementById('model').value;
  const weight = document.getElementById('weight').value;
  const image = document.getElementById('image').files[0];
  const description = document.getElementById('description').value;
  const category = document.getElementById('category').value;
  const country = document.getElementById('country').value;

  // FormData nesnesi oluşturarak verileri formata ekliyoruz
  const formData = new FormData();
  formData.append('name', name);
  formData.append('brand', brand);
  formData.append('model', model);
  formData.append('weight', weight);
  formData.append('image', image);
  formData.append('description', description);
  formData.append('category', category);
  formData.append('country', country);

  // API'ye POST isteği gönderiyoruz
  fetch('http://127.0.0.1:8000/home/iha/create', {
    method: 'POST',
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
