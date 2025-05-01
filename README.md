# Atanor Sefirotyczny

Atanor Sefirotyczny to interaktywny system transmutacji epistemicznej oparty na strukturze kabalistycznej i alchemicznej. System łączy starożytne tradycje epistemiczne z nowoczesną sztuczną inteligencją, umożliwiając głęboką eksplorację tematów przez pryzmat różnych ścieżek poznawczych.

## Funkcjonalności

- **Interaktywne Drzewo Życia** - wizualizacja 10 sefirot w tradycyjnym układzie kabalistycznym
- **Trzy formy transmutacji** - Separatio (analityczna), Coagulatio (pragmatyczna) i Coniunctio (dialektyczna)
- **Cztery fazy alchemiczne** - Nigredo (dekonstrukcja), Albedo (klaryfikacja), Citrinitas (integracja) i Rubedo (manifestacja)
- **Parametryzowane procesy** - dostosowywanie transmutacji poprzez specyficzne parametry
- **Dwa tryby działania**:
  - **Tryb generowania promptów (bez API)** - generuje zaawansowane prompty, które można wykorzystać z dowolnym modelem AI
  - **Tryb API** - bezpośrednia integracja z Claude API (wymaga klucza API)

## Instalacja i uruchomienie

### Lokalnie

1. Sklonuj repozytorium:
   ```
   git clone https://github.com/yourusername/atanor-sefirotyczny.git
   ```

2. Otwórz plik `index.html` w przeglądarce lub użyj lokalnego serwera HTTP:
   ```
   cd atanor-sefirotyczny
   npx serve .  # Jeśli masz zainstalowany Node.js
   ```

### GitHub Pages

Aplikacja jest dostępna pod adresem: [https://yourusername.github.io/atanor-sefirotyczny](https://yourusername.github.io/atanor-sefirotyczny)

## Korzystanie z systemu

### Konfiguracja trybu

Atanor Sefirotyczny oferuje dwa tryby działania:

1. **Tryb generowania promptów (bez API)** - domyślny tryb, który nie wymaga żadnych kluczy API
   - System generuje zaawansowany prompt oparty na wybranych parametrach
   - Prompt można skopiować i wykorzystać z dowolnym modelem AI (ChatGPT, Claude, itp.)

2. **Tryb API** - bezpośrednia integracja z Claude API
   - Wymaga klucza API od Anthropic
   - System automatycznie przetwarza transmutację i prezentuje wyniki
   - Umożliwia interaktywny dialog w kontekście transmutacji

Wybór trybu jest dostępny przy pierwszym uruchomieniu lub po kliknięciu "Konfiguracja API" w stopce.

### Proces transmutacji

1. **Wybierz sefirotę** - kliknij jedną z 10 sefirot na Drzewie Życia
2. **Wybierz formę transmutacji** - Separatio, Coagulatio lub Coniunctio
3. **Wybierz fazę alchemiczną** - Nigredo, Albedo, Citrinitas lub Rubedo
4. **Dostosuj parametry** - parametry specyficzne dla wybranej formy
5. **Wprowadź temat** - wpisz temat, który chcesz poddać transmutacji
6. **Rozpocznij transmutację** - kliknij przycisk "Rozpocznij transmutację"

### W trybie generowania promptów:

- System wyświetli wygenerowany prompt w polu tekstowym
- Możesz skopiować prompt za pomocą przycisku "Kopiuj prompt"
- Następnie możesz użyć tego promptu z dowolnym systemem AI

### W trybie API:

- System automatycznie wyśle prompt do API Claude
- Wyniki będą wyświetlone jako strukturyzowane etapy transmutacji
- Możesz kontynuować dialog, zadając pytania dotyczące wyników

## Etapy transmutacji

Wyniki transmutacji są strukturalizowane według etapów wybranej formy:

- **Separatio**: Materia Prima → Calcinatio → Separatio → Solutio → Quintessentia
- **Coagulatio**: Fixatio → Multiplicatio → Fermentatio → Projectio → Rubedo
- **Coniunctio**: Mortificatio Recensio → Putrefactio Creativa → Inversio Hierarchiae → Coniunctio → Lapis Philosophorum

## Struktura projektu

```
atanor-sefirotyczny/
├── index.html            # Główna strona aplikacji
├── css/
│   └── styles.css        # Style CSS
├── js/
│   ├── main.js           # Główny skrypt aplikacji
│   ├── atanorDatabase.js # Baza wiedzy (definicje sefirot, transmutacji, itp.)
│   ├── promptGenerator.js # Generator promptów
│   ├── sefirotTree.js    # Interaktywne Drzewo Życia
│   └── resultRenderer.js # Renderowanie rezultatów
└── README.md             # Dokumentacja projektu
```

## Zalecenia dot. modeli AI

Dla uzyskania najlepszych wyników w trybie promptów zalecane są modele o dużej mocy obliczeniowej:

- **Claude Opus** lub **Claude 3 Opus** - najwyższa jakość wyników
- **GPT-4** - bardzo dobre wyniki
- **Claude Sonnet**, **GPT-3.5 Turbo** - zadowalające wyniki dla prostszych tematów

## Rozszerzanie systemu

### Dodawanie nowych form transmutacji

1. Dodaj definicję nowej formy w `atanorDatabase.js` w sekcji `transmutationForms`
2. Dodaj obsługę nowych parametrów w `main.js` w funkcji `updateParameters()`
3. Aktualizuj `promptGenerator.js` aby obsługiwał nową formę

### Modyfikacja definicji sefirot

Edytuj sekcję `sefirot` w pliku `atanorDatabase.js`, aby dostosować definicje, funkcje epistemiczne i opisy poszczególnych sefirot.

## Licencja

MIT

## Autorzy

Twój Imię i Nazwisko - [GitHub](https://github.com/yourusername)
