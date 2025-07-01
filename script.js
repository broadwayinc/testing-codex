document.addEventListener('DOMContentLoaded', () => {
    const loginLink = document.getElementById('login-link');
    const logoutLink = document.getElementById('logout-link');
    skapi.getProfile().then(profile => {
        if (profile) {
            if (loginLink) loginLink.style.display = 'none';
            if (logoutLink) logoutLink.style.display = 'block';
        } else {
            if (loginLink) loginLink.style.display = 'block';
            if (logoutLink) logoutLink.style.display = 'none';
        }
    });
});

function logout() {
    skapi.logout().then(() => location.href = 'index.html');
}

function generateImage(event) {
    event.preventDefault();
    const form = event.target;
    const result = document.getElementById('result');
    result.textContent = 'Generating image...';
    const animePrompt = form.prompt.value + ' in japanese anime style';
    skapi.clientSecretRequest({
        clientSecretName: 'openai',
        url: 'https://api.openai.com/v1/images/generations',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer $CLIENT_SECRET'
        },
        data: {
            model: 'dall-e-3',
            prompt: animePrompt,
            n: 1,
            size: '1024x1024'
        }
    }).then(res => {
        const imageUrl = res.data[0].url;
        result.innerHTML = `<img src="${imageUrl}" alt="Generated image" class="responsive-img">`;
    }).catch(err => {
        result.textContent = err.message;
    });
}
