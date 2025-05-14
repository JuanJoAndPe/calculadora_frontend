// Manejar el login
document.getElementById('login-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        
        if (!response.ok) {
            throw new Error('Credenciales incorrectas');
        }
        
        const data = await response.json();
        localStorage.setItem('token', data.token);
        
        // Mostrar la aplicación y ocultar el login
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('app-container').style.display = 'block';
        
    } catch (error) {
        alert(error.message);
    }
});

// Manejar el logout
document.getElementById('logout-btn').addEventListener('click', function() {
    localStorage.removeItem('token');
    document.getElementById('login-container').style.display = 'block';
    document.getElementById('app-container').style.display = 'none';
});

// Verificar si ya está logueado al cargar la página
if (localStorage.getItem('token')) {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('app-container').style.display = 'block';
}