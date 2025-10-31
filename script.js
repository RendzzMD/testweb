fetch("data.json")
  .then(res => res.json())
  .then(data => {
    // Notifikasi global
    if (data.notif.status) {
      document.getElementById("notif").innerText = data.notif.message;
    }

    // List game
    let list = "";
    data.games.forEach(game => {
      list += `
        <div class="game">
          <h3>${game.name}</h3>
          <p>Harga: Rp ${game.price.toLocaleString()}</p>
          <button>Beli Sekarang</button>
        </div>
      `;
    });
    document.getElementById("game-list").innerHTML = list;
  })
  .catch(err => console.error("Gagal ambil data:", err));
