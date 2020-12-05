const API_ENDPOINT = 'http://localhost:3333';
const HEADERS = new Headers({
  'Content-Type': 'application/json'
});

function fetchEndpoint(endpoint, body = {}, method = 'POST') {
  return fetch(`${API_ENDPOINT}${endpoint}`, {
    method,
    headers: HEADERS,
    body: JSON.stringify(body)
  });
}

function saveOnSession(key, value) {
  sessionStorage.setItem(key, value);
}

function loadFromSession(key) {
  return sessionStorage.getItem(key);
}

function setUserInfo(userInfo) {
  saveOnSession('user_info', JSON.stringify(userInfo));
}

function getUserInfo() {
  const userInfo = loadFromSession('user_info');
  return JSON.parse(userInfo);
}

function loginUser(email) {
  fetchEndpoint('/sessions', { email })
    .then(
      function(response) {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Não foi possível fazer seu login!!');
      }
    )
    .then(setUserInfo)
    .catch(alert);
}

function updateUser(data) {
  const previousUserInfo = getUserInfo();
  const { _id } = previousUserInfo;
  fetchEndpoint(
    `/sessions/${_id}`,
    { ...previousUserInfo, ...data },
    'PUT'
  )
    .then(
      function(response) {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Não foi possível atualizar seus dados, faça login novamente!')
      }
    )
    .then(setUserInfo)
    .catch(alert);
}

$(document).ready(function() {
  $('#form-login').submit(function(event) {
    event.preventDefault();
    const email = event.target[0].value;
    loginUser(email);
  });

  $('.gallery').click(function(event) {
    const name = $(event.target).data('name');
    const { chars } = getUserInfo();
    if (!(chars.includes(name))) {
      updateUser({ chars: [ ...chars, name ] });
    }
  });
});
