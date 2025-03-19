async function searchPlayer() {
    const playerName = document.getElementById('searchInput').value;
    const skinContainer = document.getElementById('skinContainer');
    const details = document.getElementById('details');

    if (!playerName) {
        alert("Bitte geben Sie einen Minecraft-Namen ein.");
        return;
    }

    try {
        // UUID des Spielers abrufen
        const uuidResponse = await fetch(`https://api.mojang.com/users/profiles/minecraft/${playerName}`);
        if (!uuidResponse.ok) {
            throw new Error("Spieler nicht gefunden.");
        }
        const uuidData = await uuidResponse.json();
        const uuid = uuidData.id;

        // Skin und Spielerdetails anzeigen
        skinContainer.innerHTML = `<img src="https://crafatar.com/renders/body/${uuid}" alt="Minecraft Skin">`;
        
        // Zusätzliche Spielerinformationen (optional)
        const profileResponse = await fetch(`https://api.mojang.com/user/profile/${uuid}`);
        const profileData = await profileResponse.json();
        
        details.innerHTML = `
            <p><strong>Name:</strong> ${profileData.name}</p>
            <p><strong>UUID:</strong> ${uuid}</p>
        `;
    } catch (error) {
        skinContainer.innerHTML = '';
        details.innerHTML = `<p style="color: red;">${error.message}</p>`;
    }
}
