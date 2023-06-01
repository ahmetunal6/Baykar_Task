var dataFromApi = [];

// API'den veri almak için getData() fonksiyonunu kullanıyoruz
function getData() {
  fetch("http://127.0.0.1:8000/home/iha")
    .then((response) => response.json())
    .then((response) => {
      dataFromApi = response;
      createCards();
    })
    .catch((error) => {
      console.error("Veri alınırken bir hata oluştu:", error);
    });
}

// API'den alınan verilere göre kartları oluşturan createCards() fonksiyonu
function createCards() {
  const cardContainer = document.getElementById("cardContainer");
  cardContainer.innerHTML = "";

  // Her bir veri öğesi için bir kart oluşturuyoruz
  dataFromApi.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card", "col-md-3", "mb-3", "mx-2");
    card.style.width = "18rem";

    // Resim elementi
    const image = document.createElement("img");
    image.src = item.image;
    image.classList.add("card-img-top");
    image.alt = "...";

    // Kart gövdesi
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    // Başlık
    const title = document.createElement("h5");
    title.classList.add("card-title");
    title.textContent = item.name;

    // Açıklama
    const description = document.createElement("p");
    description.classList.add("card-text");
    description.textContent = item.description;

    // Liste grubu
    const listGroup = document.createElement("ul");
    listGroup.classList.add("list-group", "list-group-flush");

    // Liste öğeleri
    const listItem1 = document.createElement("li");
    listItem1.classList.add("list-group-item");
    listItem1.textContent = "Kategori - " + item.category;

    const listItem2 = document.createElement("li");
    listItem2.classList.add("list-group-item");
    listItem2.textContent = "Ülke - " + item.country;

    const listItem3 = document.createElement("li");
    listItem3.classList.add("list-group-item");
    listItem3.textContent = "Ağırlık - " + item.weight + " kg";

    // Kart gövdesi (2)
    const cardBody2 = document.createElement("div");
    cardBody2.classList.add("card-body");

    // Silme linki
    const link1 = document.createElement("a");
    link1.href = "#";
    link1.classList.add("card-link");
    link1.textContent = "sil";
    link1.addEventListener("click", function () {
      const postId = item.id;
      deleteData(postId);
    });

    // Detay gösterme linki
    const link2 = document.createElement("a");
    link2.href = "#";
    link2.classList.add("card-link");
    link2.textContent = "detay göster";

    // Kartı oluşturulan elementlere ekleme yapılıyor
    card.appendChild(image);
    card.appendChild(cardBody);
    card.appendChild(listGroup);
    card.appendChild(cardBody2);

    cardBody.appendChild(title);
    cardBody.appendChild(description);

    listGroup.appendChild(listItem1);
    listGroup.appendChild(listItem2);
    listGroup.appendChild(listItem3);

    cardBody2.appendChild(link1);
    cardBody2.appendChild(link2);

    cardContainer.appendChild(card);
  });
}

// Veri silmek için deleteData() fonksiyonu
function deleteData(id) {
  fetch(`http://127.0.0.1:8000/home/iha/${id}`, {
    method: "DELETE"
  })
    .then((response) => {
      getData();
      window.location.reload();
    })
    .catch((error) => {
      console.error("Silme işlemi sırasında bir hata oluştu:", error);
    });
}

// Sayfa yüklendiğinde verileri almak için getData() fonksiyonu çağrılıyor
getData();

// Sayfa yüklendiğinde çalışacak olan DOMContentLoaded eventi
document.addEventListener("DOMContentLoaded", function () {
  const checkbox1 = document.getElementById("country1");
  const checkbox2 = document.getElementById("country2");
  const searchInput = document.getElementById("searchInput");
  const cardContainer = document.getElementById("cardContainer");

  // API'den veri almak için fetchDataFromApi() fonksiyonu
  function fetchDataFromApi(filterValue, searchValue) {
    let url = "http://127.0.0.1:8000/home/iha";

    const params = new URLSearchParams();
    if (filterValue) {
      params.append("country", filterValue);
    }
    if (searchValue) {
      params.append("search", searchValue);
    }

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        dataFromApi = response;
        renderCards();
      })
      .catch((error) => {
        console.error("Veri alınırken bir hata oluştu:", error);
      });
  }
  function sendFilterRequest() {
    const selectedFilters = [];
    if (checkbox1.checked && checkbox2.checked) {
      selectedFilters.push(checkbox1.value, checkbox2.value);
    } else if (checkbox1.checked) {
      selectedFilters.push(checkbox1.value);
    } else if (checkbox2.checked) {
      selectedFilters.push(checkbox2.value);
    }

    const filterValue = selectedFilters.join(",");
    const searchValue = searchInput.value.trim();

    fetchDataFromApi(filterValue, searchValue);
  }

  // Kartları oluşturan renderCards() fonksiyonu
  function renderCards() {
    cardContainer.innerHTML = "";

    dataFromApi.forEach((item) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.style.width = "18rem";

      const image = document.createElement("img");
      image.src = item.image;
      image.classList.add("card-img-top");
      image.alt = "...";

      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

      const title = document.createElement("h5");
      title.classList.add("card-title");
      title.textContent = item.name;

      const description = document.createElement("p");
      description.classList.add("card-text");
      description.textContent = item.description;

      const listGroup = document.createElement("ul");
      listGroup.classList.add("list-group", "list-group-flush");

      const listItem1 = document.createElement("li");
      listItem1.classList.add("list-group-item");
      listItem1.textContent = "Kategori - " + item.category;

      const listItem2 = document.createElement("li");
      listItem2.classList.add("list-group-item");
      listItem2.textContent = "Ülke - " + item.country;

      const listItem3 = document.createElement("li");
      listItem3.classList.add("list-group-item");
      listItem3.textContent = "Ağırlık - " + item.weight + " kg";

      const cardBody2 = document.createElement("div");
      cardBody2.classList.add("card-body");

      const link1 = document.createElement("a");
      link1.href = "#";
      link1.classList.add("card-link");
      link1.textContent = "sil";
      link1.addEventListener("click", function () {
        const postId = item.id;
        deleteData(postId);
      });

      const link2 = document.createElement("a");
      link2.href = "http://127.0.0.1:8000/home/update?id=" + item.id;
      link2.classList.add("card-link");
      link2.textContent = "detay göster";

      card.appendChild(image);
      card.appendChild(cardBody);
      card.appendChild(listGroup);
      card.appendChild(cardBody2);

      cardBody.appendChild(title);
      cardBody.appendChild(description);

      listGroup.appendChild(listItem1);
      listGroup.appendChild(listItem2);
      listGroup.appendChild(listItem3);

      cardBody2.appendChild(link1);
      cardBody2.appendChild(link2);

      cardContainer.appendChild(card);
    });
  }
  //chechboxları dinlemek için 
  checkbox1.addEventListener("change", sendFilterRequest);
  checkbox2.addEventListener("change", sendFilterRequest);
  // Arama girdisi değiştiğinde çalışacak olan event
  searchInput.addEventListener("input", function () {
    let filterValue = "";
    if (checkbox1.checked && checkbox2.checked) {
      filterValue = "bothSelected"; // İkisi de seçiliyse özel bir değer atayabilirsiniz.
    } else if (checkbox1.checked) {
      filterValue = checkbox1.value; // Sadece checkbox1 seçiliyse checkbox1 değerini alır.
    } else if (checkbox2.checked) {
      filterValue = checkbox2.value; // Sadece checkbox2 seçiliyse checkbox2 değerini alır.
    }
  
    const searchValue = searchInput.value.trim();
    fetchDataFromApi(filterValue, searchValue);
  });

  // Sayfa yüklendiğinde verileri almak için fetchDataFromApi() fonksiyonu çağrılıyor
  fetchDataFromApi();
});

