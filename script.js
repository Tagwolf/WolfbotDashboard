async function searchPlayer() {
    const playerName = document.getElementById('searchInput').value;
    const skinContainer = document.getElementById('skinContainer');
    const details = document.getElementById('details');

    if (!playerName) {
        alert("Bitte geben Sie einen Minecraft-Namen ein.");
        return;
    }

    try {
        // UUID des Spielers abrufen (über eine alternative API)
        const uuidResponse = await fetch(`https://api.minetools.eu/uuid/${playerName}`);
        if (!uuidResponse.ok) {
            throw new Error("Spieler nicht gefunden.");
        }
        const uuidData = await uuidResponse.json();
        const uuid = uuidData.id;

        if (!uuid) {
            throw new Error("Spieler nicht gefunden.");
        }

        // Skin und Spielerdetails anzeigen
        skinContainer.innerHTML = `<img src="https://crafatar.com/renders/body/${uuid}?overlay" alt="Minecraft Skin">`;
        
        // Zusätzliche Spielerinformationen
        details.innerHTML = `
            <p><strong>Name:</strong> ${playerName}</p>
            <p><strong>UUID:</strong> ${uuid}</p>
        `;
    } catch (error) {
        skinContainer.innerHTML = '';
        details.innerHTML = `<p style="color: red;">${error.message}</p>`;
    }
}
