export interface Artistas {
  artistas: artista[];
}

interface artista {
  id: number;
  nombre: string;
}

export const artistas: Artistas = {
  artistas: [
    // Rock Clásico / Rock Alternativo
    { id: 1, nombre: 'The Beatles' },
    { id: 2, nombre: 'The Rolling Stones' },
    { id: 3, nombre: 'Led Zeppelin' },
    { id: 4, nombre: 'Pink Floyd' },
    { id: 5, nombre: 'Queen' },
    { id: 6, nombre: 'The Who' },
    { id: 7, nombre: 'The Doors' },
    { id: 8, nombre: 'AC/DC' },
    { id: 9, nombre: 'The Eagles' },
    { id: 10, nombre: 'The Kinks' },
    { id: 11, nombre: 'The Beach Boys' },
    { id: 12, nombre: 'Fleetwood Mac' },
    { id: 13, nombre: 'David Bowie' },
    { id: 14, nombre: 'The Police' },
    { id: 15, nombre: 'The Cure' },
    { id: 16, nombre: 'R.E.M.' },
    { id: 17, nombre: 'U2' },
    { id: 18, nombre: 'Radiohead' },
    { id: 19, nombre: 'Oasis' },
    { id: 20, nombre: 'The Smashing Pumpkins' },
    { id: 21, nombre: 'Foo Fighters' },
    { id: 22, nombre: 'The Strokes' },
    { id: 23, nombre: 'Arctic Monkeys' },
    { id: 24, nombre: 'The White Stripes' },
    { id: 25, nombre: 'The Killers' },
    { id: 26, nombre: 'Coldplay' },
    { id: 27, nombre: 'Green Day' },
    { id: 28, nombre: 'Nirvana' },
    { id: 29, nombre: 'Pearl Jam' },
    { id: 30, nombre: 'Soundgarden' },
    { id: 31, nombre: 'Alice In Chains' },
    { id: 32, nombre: 'Stone Temple Pilots' }, // (Nota: añadido para completar grunge)

    // Metal / Hard Rock
    { id: 33, nombre: 'Metallica' },
    { id: 34, nombre: 'Iron Maiden' },
    { id: 35, nombre: 'Black Sabbath' },
    { id: 36, nombre: 'Deep Purple' },
    { id: 37, nombre: 'Judas Priest' }, // (Nota: añadido para completar metal)
    { id: 38, nombre: 'Motörhead' },
    { id: 39, nombre: 'Slayer' },
    { id: 40, nombre: 'Dream Theater' },
    { id: 41, nombre: "Guns N' Roses" },
    { id: 42, nombre: 'Bon Jovi' },
    { id: 43, nombre: 'Def Leppard' },
    { id: 44, nombre: 'Kiss' },
    { id: 45, nombre: 'Mötley Crüe' }, // (Nota: añadido para completar glam metal)
    { id: 46, nombre: 'Barón Rojo' },
    { id: 47, nombre: 'Obús' },

    // Pop Internacional
    { id: 48, nombre: 'Michael Jackson' },
    { id: 49, nombre: 'Madonna' },
    { id: 50, nombre: 'Prince' },
    { id: 51, nombre: 'Whitney Houston' },
    { id: 52, nombre: 'Mariah Carey' },
    { id: 53, nombre: 'Céline Dion' },
    { id: 54, nombre: 'Britney Spears' },
    { id: 55, nombre: 'Christina Aguilera' },
    { id: 56, nombre: 'Jennifer Lopez' },
    { id: 57, nombre: 'Shakira' },
    { id: 58, nombre: 'Taylor Swift' },
    { id: 59, nombre: 'Ariana Grande' },
    { id: 60, nombre: 'Billie Eilish' },
    { id: 61, nombre: 'Dua Lipa' },
    { id: 62, nombre: 'Ed Sheeran' },
    { id: 63, nombre: 'Justin Bieber' },
    { id: 64, nombre: 'Harry Styles' },
    { id: 65, nombre: 'Selena Gomez' },
    { id: 66, nombre: 'Camila Cabello' },
    { id: 67, nombre: 'Shawn Mendes' },
    { id: 68, nombre: 'Miley Cyrus' },
    { id: 69, nombre: 'Katy Perry' },
    { id: 70, nombre: 'Lady Gaga' },
    { id: 71, nombre: 'Beyoncé' },
    { id: 72, nombre: 'Rihanna' },
    { id: 73, nombre: 'Olivia Rodrigo' },
    { id: 74, nombre: 'Lana Del Rey' },
    { id: 75, nombre: 'ABBA' },

    // Hip-Hop / Rap
    { id: 76, nombre: 'Eminem' }, // (Nota: añadido para completar rap)
    { id: 77, nombre: 'Kanye West' }, // (Nota: añadido)
    { id: 78, nombre: 'Kase.O' },
    { id: 79, nombre: 'Natos y Waor' },
    { id: 80, nombre: 'Violadores del verso' },
    { id: 81, nombre: 'Hoke' },
    { id: 82, nombre: 'C. Tangana' },
    { id: 83, nombre: 'Rels B' },
    { id: 84, nombre: 'Bad Gyal' },
    { id: 85, nombre: 'Yung Beef' },
    { id: 86, nombre: 'Kidd Keo' }, // QUÉ CALIENTO, QUÉ?
    { id: 87, nombre: 'Bejo' },
    { id: 88, nombre: 'Cardi B' },
    { id: 89, nombre: 'Nicki Minaj' },
    { id: 90, nombre: 'Doja Cat' },
    { id: 91, nombre: 'SZA' },

    // Rock/Pop Español
    { id: 92, nombre: 'Héroes del Silencio' },
    { id: 93, nombre: 'Extremoduro' },
    { id: 94, nombre: 'Platero y Tú' },
    { id: 95, nombre: 'Marea' },
    { id: 96, nombre: 'Rosendo' },
    { id: 97, nombre: 'Bunbury' },
    { id: 98, nombre: 'Andrés Calamaro' },
    { id: 99, nombre: 'Joaquín Sabina' },
    { id: 100, nombre: 'Fito & Fitipaldis' },
    { id: 101, nombre: 'Los Rodríguez' },
    { id: 102, nombre: 'Leiva' },
    { id: 103, nombre: 'Duncan Dhu' },
    { id: 104, nombre: 'Los Secretos' },
    { id: 105, nombre: 'Nacha Pop' },
    { id: 106, nombre: 'Hombres G' },
    { id: 107, nombre: 'Revólver' },
    { id: 108, nombre: 'Manolo García' },
    { id: 109, nombre: 'Miguel Ríos' },
    { id: 110, nombre: 'Robe' },
    { id: 111, nombre: 'Iván Ferreiro' },

    // Indie/Alternativo Español
    { id: 112, nombre: 'Vetusta Morla' },
    { id: 113, nombre: 'Izal' },
    { id: 114, nombre: 'Love of Lesbian' },
    { id: 115, nombre: 'Deluxe' },
    { id: 116, nombre: 'Supersubmarina' },
    { id: 117, nombre: 'Lori Meyers' },
    { id: 118, nombre: 'Antílopez' },
    { id: 119, nombre: 'Pereza' },
    { id: 120, nombre: 'La Oreja de Van Gogh' },
    { id: 121, nombre: 'Amaral' },
    { id: 122, nombre: 'El Canto del Loco' },
    { id: 123, nombre: 'Mecano' },
    { id: 124, nombre: 'El Kanka' },
    { id: 125, nombre: 'Zahara' },
    { id: 126, nombre: 'Silvana Estrada' },
    { id: 127, nombre: 'Sidonie' },
    { id: 128, nombre: 'Kiko Veneno' },

    // Reggaeton/Latino
    { id: 129, nombre: 'Bad Bunny' },
    { id: 130, nombre: 'J Balvin' },
    { id: 131, nombre: 'Maluma' },
    { id: 132, nombre: 'Ozuna' },
    { id: 133, nombre: 'Anuel AA' },
    { id: 134, nombre: 'Karol G' },
    { id: 135, nombre: 'Nicky Jam' },
    { id: 136, nombre: 'Farruko' },
    { id: 137, nombre: 'Don Omar' },
    { id: 138, nombre: 'Wisin & Yandel' },
    { id: 139, nombre: 'Yandel' },
    { id: 140, nombre: 'Zion & Lennox' },
    { id: 141, nombre: 'Luis Fonsi' },
    { id: 142, nombre: 'Pitbull' },
    { id: 143, nombre: 'Daddy Yankee' },
    { id: 144, nombre: 'Rosalía' },
    { id: 145, nombre: 'Nene Malo' },

    // Otros (Flamenco, Folk, Varios)
    { id: 146, nombre: 'Paco de Lucía' },
    { id: 147, nombre: 'Camela' }, // (Rumba flamenca)
    { id: 148, nombre: 'Estopa' },
    { id: 149, nombre: 'Celtas Cortos' },
    { id: 150, nombre: 'Jarabe de Palo' },
    { id: 151, nombre: 'Macaco' },
    { id: 152, nombre: 'Albert Pla' },
    { id: 153, nombre: 'Bebe' },
    { id: 154, nombre: 'Melendi' },
    { id: 155, nombre: 'Don Patricio' },
    { id: 156, nombre: 'La Pegatina' },
    { id: 157, nombre: 'Ska-P' },
    { id: 158, nombre: 'Txarrena' },
    { id: 159, nombre: 'Kishi Bashi' }, // (Indie experimental)
    { id: 160, nombre: 'Pablo Alborán' },
    { id: 161, nombre: 'Aitana' },
    { id: 162, nombre: 'Alaska' },
    { id: 163, nombre: 'Ergo Pro' },
    { id: 164, nombre: 'Cecilio G' },
    { id: 165, nombre: 'Dover' }, // (Rock en inglés de bandas españolas)
    { id: 166, nombre: 'M-Clan' }, // (Nota: añadido para completar rock español)
    { id: 167, nombre: 'Sabrina Carpenter' },
    { id: 168, nombre: 'Lizzo' },
    { id: 169, nombre: 'Halsey' },
    { id: 170, nombre: 'The Clash' }, // (Punk/rock)
    { id: 171, nombre: 'The Smiths' }, // (Indie/rock)
    { id: 172, nombre: 'Yes' }, // (Rock progresivo)
    { id: 173, nombre: 'Genesis' }, // (Rock progresivo/pop)
    { id: 174, nombre: 'Britney Spears' },
    { id: 175, nombre: 'Adele' },
    { id: 176, nombre: 'Bruno Mars' },
    { id: 177, nombre: 'The Weeknd' },
    { id: 178, nombre: 'Sia' },
    { id: 179, nombre: '21 Pilots' },
    { id: 180, nombre: 'Anónimo' },
  ],
};
