# Atanor Sefirotyczny

Atanor Sefirotyczny to interaktywny system transmutacji epistemicznej oparty na strukturze kabalistycznej i alchemicznej. System łączy starożytne tradycje epistemiczne z nowoczesną sztuczną inteligencją, umożliwiając głęboką eksplorację tematów przez pryzmat różnych ścieżek poznawczych.

## Funkcjonalności

- **Interaktywne Drzewo Życia** - wizualizacja 10 sefirot w tradycyjnym układzie kabalistycznym
- **Trzy formy transmutacji** - Separatio (analityczna), Coagulatio (pragmatyczna) i Coniunctio (dialektyczna)
- **Cztery fazy alchemiczne** - Nigredo (dekonstrukcja), Albedo (klaryfikacja), Citrinitas (integracja) i Rubedo (manifestacja)
- **Parametryzowane procesy** - dostosowywanie transmutacji poprzez specyficzne parametry
- **Interaktywny dialog** - możliwość eksploracji wyników poprzez zadawanie dodatkowych pytań

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

### Konfiguracja API

Atanor Sefirotyczny używa modelu Claude od Anthropic do generowania transformacji. Aby korzystać z systemu, potrzebujesz klucza API:

1. Utwórz konto na [Anthropic](https://www.anthropic.com/)
2. Wygeneruj klucz API w panelu użytkownika
3. Wprowadź klucz w oknie konfiguracji Atanora

### Proces transmutacji

1. **Wybierz sefirotę** - kliknij jedną z 10 sefirot na Drzewie Życia
2. **Wybierz formę transmutacji** - Separatio, Coagulatio lub Coniunctio
3. **Wybierz fazę alchemiczną** - Nigredo, Albedo, Citrinitas lub Rubedo
4. **Dostosuj parametry** - parametry specyficzne dla wybranej formy
5. **Wprowadź temat** - wpisz temat, który chcesz poddać transmutacji
6. **Rozpocznij transmutację** - kliknij przycisk "Rozpocznij transmutację"

### Interpretacja wyników

Wyniki transmutacji są strukturalizowane według etapów wybranej formy:

- **Separatio**: Materia Prima → Calcinatio → Separatio → Solutio → Quintessentia
- **Coagulatio**: Fixatio → Multiplicatio → Fermentatio → Projectio → Rubedo
- **Coniunctio**: Mortificatio Recensio → Putrefactio Creativa → Inversio Hierarchiae → Coniunctio → Lapis Philosophorum

Po zakończeniu transmutacji możesz zadawać pytania dotyczące wyników, eksplorując temat głębiej.

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

## Rozszerzanie systemu

### Dodawanie nowych form transmutacji

1. Dodaj definicję nowej formy w `atanorDatabase.js` w sekcji `transmutationForms`
2. Dodaj obsługę nowych parametrów w `main.js` w funkcji `updateParameters()`
3. Aktualizuj `promptGenerator.js` aby obsługiwał nową formę

### Modyfikacja definicji sefirot

Edytuj sekcję `sefirot` w pliku `atanorDatabase.js`, aby dostosować definicje, funkcje epistemiczne i opisy poszczególnych sefirot.

## Techniczne szczegóły

- **D3.js** - do wizualizacji Drzewa Życia
- **Marked.js** - do parsowania odpowiedzi Markdown
- **Claude API** - do generowania transformacji epistemicznych

## Licencja

MIT

## Autorzy

Twój Imię i Nazwisko - [GitHub](https://github.com/yourusername)
