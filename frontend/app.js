const API = "https://backend-auth-jwt-lato.onrender.com";

// Helpers
const $ = id => document.getElementById(id);
const setStatus = (msg, type = 'info') => {
  const el = $('status');
  el.textContent = msg;
  el.className = `status ${type}`;
};

// Modal helpers
const showModal = (message, type = 'info', title = 'Notificación', opts = {}) => {
  const overlay = $('modalOverlay');
  overlay.classList.remove('hidden');
  overlay.setAttribute('aria-hidden', 'false');
  // type classes
  overlay.classList.remove('modal-success','modal-error','modal-info');
  overlay.classList.add(`modal-${type}`);
  $('modalMessage').textContent = message;
  $('modalTitle').textContent = title;
  // icon text
  const icon = $('modalIcon');
  icon.textContent = type === 'success' ? '✓' : type === 'error' ? '!' : 'i';
  // viewProfile button
  const viewBtn = $('modalViewProfile');
  if (viewBtn) {
    if (opts.viewProfile) viewBtn.classList.remove('hidden'); else viewBtn.classList.add('hidden');
  }
  // focus primary
  setTimeout(() => $('modalOk').focus(), 50);
};

const hideModal = () => {
  const overlay = $('modalOverlay');
  overlay.classList.add('hidden');
  overlay.setAttribute('aria-hidden', 'true');
  const viewBtn = $('modalViewProfile'); if (viewBtn) viewBtn.classList.add('hidden');
};

const setLoading = (isLoading) => {
  $('btnLogin').disabled = isLoading;
  $('btnRegister').disabled = isLoading;
  if (isLoading) setStatus('Enviando...');
};

const validate = (email, password) => {
  const emailRe = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  if (!emailRe.test(email)) return 'Email inválido';
  if (!password || password.length < 6) return 'La contraseña debe tener al menos 6 caracteres';
  return null;
};

// Password strength
const scorePassword = (pwd) => {
  let score = 0;
  if (!pwd) return 0;
  if (pwd.length >= 6) score += 1;
  if (pwd.length >= 10) score += 1;
  if (/[0-9]/.test(pwd)) score += 1;
  if (/[A-Z]/.test(pwd)) score += 1;
  if (/[^A-Za-z0-9]/.test(pwd)) score += 1;
  return score; // 0-5
};

const updatePwdMeter = (pwd) => {
  const meter = $('pwdMeter');
  const text = $('pwdText');
  if (!meter || !text) return;
  const s = scorePassword(pwd);
  const pct = Math.min(100, (s / 5) * 100);
  meter.style.width = pct + '%';
  meter.className = 'meter-bar';
  if (s <= 1) { meter.classList.add('weak'); text.textContent = 'Débil'; }
  else if (s <= 3) { meter.classList.add('medium'); text.textContent = 'Media'; }
  else { meter.classList.add('strong'); text.textContent = 'Fuerte'; }
};

async function doRegister(email, password) {
  const res = await fetch(`${API}/registro`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const text = await res.text();
  if (!res.ok) throw new Error(text || res.statusText || 'Error en registro');
  return text;
}

async function doLogin(email, password) {
  const res = await fetch(`${API}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return res.json();
}

async function register() {
  const email = $('email').value.trim();
  const password = $('password').value;
  const err = validate(email, password);
  if (err) {
    setStatus(err, 'error');
    showModal(err, 'error', 'Error');
    return;
  }
  try {
    setLoading(true);
    const text = await doRegister(email, password);
    // mostrar éxito y volver al login
    setStatus(text, 'success');
    showModal(text, 'success', 'Registro exitoso');
    // cambiar a pestaña login y limpiar campos
    setMode('login');
    const eEl = $('email'); const pEl = $('password'); if (eEl) eEl.value = ''; if (pEl) pEl.value = '';
  } catch (e) {
    console.error('Registro fallo:', e);
    const msg = e && e.message ? e.message : 'Error de red o servidor';
    setStatus(msg, 'error');
    showModal(msg, 'error', 'Error');
  } finally {
    setLoading(false);
  }
}

async function login() {
  const email = $('email').value.trim();
  const password = $('password').value;
  const err = validate(email, password);
  if (err) {
    setStatus(err, 'error');
    showModal(err, 'error', 'Error');
    return;
  }

  try {
    setLoading(true);
    const data = await doLogin(email, password);
    if (data && data.token) {
      localStorage.setItem('token', data.token);
      // almacenar token pero no mostrarlo en UI
      setStatus('Login exitoso', 'success');
      // mostrar modal que indica token generado y ofrecer ver perfil
      showModal('Token generado. Puedes ver tu perfil.', 'success', 'Login exitoso', { viewProfile: true });
    } else if (data && data.msg) {
      setStatus(data.msg, 'error');
      showModal(data.msg, 'error', 'Error');
    } else {
      setStatus('Credenciales inválidas', 'error');
      showModal('Credenciales inválidas', 'error', 'Error');
    }
  } catch (e) {
    setStatus('Error de red o servidor', 'error');
    showModal('Error de red o servidor', 'error', 'Error');
  } finally {
    setLoading(false);
  }
}

async function perfil() {
  const token = localStorage.getItem('token');
  if (!token) return setStatus('No hay token almacenado', 'error');

  try {
    setLoading(true);
    const res = await fetch(`${API}/perfil`, {
      headers: { 'Authorization': token }
    });
    // intentar parsear JSON; si no, mostrar texto
    let data;
    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      data = await res.json();
      showProfile(data);
      setStatus('Perfil cargado', 'info');
    } else {
      const text = await res.text();
      setStatus(text, 'info');
    }
  } catch (e) {
    setStatus('Error obteniendo perfil', 'error');
  } finally {
    setLoading(false);
  }
}

function copyToken() {
  const token = localStorage.getItem('token');
  if (!token) return setStatus('No hay token para copiar', 'error');
  navigator.clipboard.writeText(token).then(() => setStatus('Token copiado al portapapeles', 'success'))
    .catch(() => setStatus('No se pudo copiar', 'error'));
}

function logout() {
  localStorage.removeItem('token');
  const p = $('profile'); if (p) p.classList.add('hidden');
  setStatus('Sesión cerrada', 'info');
}

// UI bindings
document.addEventListener('DOMContentLoaded', () => {
  $('btnRegister').addEventListener('click', register);
  $('btnLogin').addEventListener('click', login);
  if ($('btnPerfil')) $('btnPerfil').addEventListener('click', perfil);
  if ($('btnCopy')) $('btnCopy').addEventListener('click', copyToken);
  if ($('btnLogout')) $('btnLogout').addEventListener('click', logout);

  $('togglePwd').addEventListener('click', () => {
    const p = $('password');
    if (p.type === 'password') { p.type = 'text'; $('togglePwd').innerText = 'Ocultar'; }
    else { p.type = 'password'; $('togglePwd').innerText = 'Mostrar'; }
  });

  // password strength binding
  const pwd = $('password');
  if (pwd) pwd.addEventListener('input', (e) => updatePwdMeter(e.target.value));

  // modal events
  if ($('modalClose')) $('modalClose').addEventListener('click', hideModal);
  if ($('modalOk')) $('modalOk').addEventListener('click', hideModal);
  if ($('modalOverlay')) $('modalOverlay').addEventListener('click', (e) => { if (e.target === $('modalOverlay')) hideModal(); });
  if ($('modalViewProfile')) $('modalViewProfile').addEventListener('click', () => { hideModal(); window.location.href = 'profile.html'; });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') hideModal(); });

  // tabs (login / register)
  $('tabLogin').addEventListener('click', () => setMode('login'));
  $('tabRegister').addEventListener('click', () => setMode('register'));

  // evitar submit por defecto y manejar Enter según modo
  const form = $('authForm');
  form.addEventListener('submit', e => e.preventDefault());
  form.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (currentMode === 'login') login(); else register();
    }
  });

  // inicializar modo
  setMode('login');

  // load token if exists (do not render token in UI)
  const t = localStorage.getItem('token');
  if (t) {
    // try to load profile automatically if token present
    perfil();
  }
});

// show profile in UI
function showProfile(data) {
  const p = $('profile');
  if (!p) return;
  const email = data.email || data.user?.email || '';
  const id = data.id || data.user?._id || data.user?.id || '';
  $('profileEmail').textContent = email;
  $('profileId').textContent = id;
  p.classList.remove('hidden');
  p.classList.add('fade-in');
}

// modo y función para alternar pestañas (global)
let currentMode = 'login';
function setMode(mode) {
  currentMode = mode;
  const card = document.querySelector('.card');
  const tabLogin = $('tabLogin');
  const tabRegister = $('tabRegister');
  const title = $('cardTitle');
  if (mode === 'login') {
    if (tabLogin) { tabLogin.classList.add('active'); tabLogin.setAttribute('aria-selected','true'); }
    if (tabRegister) { tabRegister.classList.remove('active'); tabRegister.setAttribute('aria-selected','false'); }
    if (card) { card.classList.remove('mode-register'); card.classList.add('mode-login'); }
    if (title) title.innerText = 'Iniciar sesión';
    if ($('btnLogin')) { $('btnLogin').classList.add('primary'); $('btnLogin').style.display = 'inline-block'; }
    if ($('btnRegister')) $('btnRegister').style.display = 'none';
    const meter = $('pwdMeter'); if (meter && meter.parentElement) meter.parentElement.classList.add('hidden');
    const pwdText = $('pwdText'); if (pwdText) pwdText.classList.add('hidden');
    const emailEl = $('email'); const pwdEl = $('password'); if (emailEl) emailEl.value = ''; if (pwdEl) pwdEl.value = '';
  } else {
    if (tabRegister) { tabRegister.classList.add('active'); tabRegister.setAttribute('aria-selected','true'); }
    if (tabLogin) { tabLogin.classList.remove('active'); tabLogin.setAttribute('aria-selected','false'); }
    if (card) { card.classList.remove('mode-login'); card.classList.add('mode-register'); }
    if (title) title.innerText = 'Crear cuenta';
    if ($('btnLogin')) { $('btnLogin').classList.remove('primary'); $('btnLogin').style.display = 'none'; }
    if ($('btnRegister')) $('btnRegister').style.display = 'inline-block';
    const meter2 = $('pwdMeter'); if (meter2 && meter2.parentElement) meter2.parentElement.classList.remove('hidden');
    const pwdText2 = $('pwdText'); if (pwdText2) pwdText2.classList.remove('hidden');
    const emailEl2 = $('email'); const pwdEl2 = $('password'); if (emailEl2) emailEl2.value = ''; if (pwdEl2) pwdEl2.value = '';
  }
}