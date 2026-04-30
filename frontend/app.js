const API = "https://backend-auth-jwt-lato.onrender.com";

async function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API}/registro`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  const data = await res.text();
  document.getElementById("result").innerText = data;
}

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (data.token) {
    localStorage.setItem("token", data.token);
    document.getElementById("result").innerText = "Login exitoso 🔥";
  } else {
    document.getElementById("result").innerText = "Error ❌";
  }
}

async function perfil() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API}/perfil`, {
    headers: {
      "Authorization": token
    }
  });

  const data = await res.text();
  document.getElementById("result").innerText = data;
}