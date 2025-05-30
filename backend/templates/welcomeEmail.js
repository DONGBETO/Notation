exports.welcomeTemplate = (firstName, lastName, email) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; color: #333; text-align: center; }
        .container { padding: 20px; max-width: 600px; margin: auto; }
        .btn { background-color: #007bff; color: white; padding: 10px; text-decoration: none; border-radius: 5px; display: inline-block; }
    </style>
</head>
<body>
    <div class="container">
        <h2>Bienvenue sur notre plateforme, ${firstName} ${lastName} !</h2>
        <p>Votre compte a été créé avec succès.</p>
        <p>Voici vos informations :</p>
        <p><strong>Email :</strong> ${email}</p>
        <p>Vous pouvez vous connecter dès maintenant :</p>
        <a class="btn" href="http://localhost:5500/pages/index">Se connecter</a>
    </div>
</body>
</html>
`;