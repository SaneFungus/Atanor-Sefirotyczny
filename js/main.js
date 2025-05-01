/**
 * Główny skrypt aplikacji Atanor Sefirotyczny
 * Odpowiada za inicjalizację komponentów, obsługę interakcji użytkownika
 * i koordynację procesu transmutacji
 */

// Stan aplikacji
const appState = {
  // Wybory użytkownika
  selectedSefirah: null,
  selectedTransmutationForm: null,
  selectedAlchemicalPhase: null,
  
  // Parametry transmutacji (wartości domyślne będą nadpisywane)
  parameters: {
    // Parametry dla Separatio
    analysisDepth: 5,
    perspectives: ["ontological", "epistemological"],
    
    // Parametry dla Coagulatio
    temporalScope: "medium",
    systemLevel: "organizational",
    
    // Parametry dla Coniunctio
    dialecticalTension: 5,
    synthesisType: "hegelian"
  },
  
  // Temat transmutacji
  topic: "",
  
  // Historia dialogu
  dialogHistory: [],
  
  // Klucz API do modelu AI
  apiKey: null,
  
  // Tryb aplikacji ('api' lub 'prompt')
  appMode: 'prompt',
  
  // Flaga wskazująca, czy transmutacja jest w toku
  isTransmuting: false
};

// Inicjalizacja aplikacji po załadowaniu DOM
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing Atanor Sefirotyczny...');
  
  // Inicjalizacja komponentów
  initializeComponents();
  
  // Sprawdzenie, czy klucz API jest już zapisany
  checkApiKey();
  
  // Inicjalizacja obsługi zdarzeń
  initializeEventListeners();
});

/**
 * Inicjalizuje główne komponenty aplikacji
 */
function initializeComponents() {
  // Inicjalizacja Drzewa Sefirotycznego
  window.sefirotTree = new SefirotTree('sefirotic-tree', handleSefirahSelect);
  
  // Inicjalizacja renderera wyników
  window.resultRenderer = new ResultRenderer(
    'result-container',
    'result-stages',
    'loading-indicator',
    'dialog-container'
  );
  
  // Generator promptów jest już zainicjalizowany w promptGenerator.js
  
  // Inicjalizacja parametrów
  initializeParametersUI();
}

/**
 * Sprawdza, czy klucz API jest zapisany i wyświetla modal jeśli nie
 */
function checkApiKey() {
  console.log('Checking API key configuration...');
  
  // Sprawdzenie trybu aplikacji
  const savedMode = localStorage.getItem('atanor-mode');
  
  if (savedMode) {
    appState.appMode = savedMode;
    
    // Aktualizacja wskaźnika trybu
    updateModeIndicator(savedMode);
    
    // Zaznacz odpowiedni radiobutton w modalu
    const modeRadio = document.getElementById(`mode-${savedMode}`);
    if (modeRadio) {
      console.log(`Setting mode radio to ${savedMode}`);
      modeRadio.checked = true;
    }
    
    // Jeśli tryb API, sprawdź czy jest klucz
    if (savedMode === 'api') {
      const savedApiKey = localStorage.getItem('atanor-api-key');
      if (savedApiKey) {
        appState.apiKey = savedApiKey;
        document.getElementById('apiKeyInput').value = savedApiKey;
        document.getElementById('apiKeyModal').style.display = 'none';
        console.log('API key found, hiding modal');
        return;
      }
    } else {
      // Tryb prompt, nie potrzeba klucza
      document.getElementById('apiKeyModal').style.display = 'none';
      console.log('Prompt mode selected, hiding modal');
      return;
    }
  }
  
  // Brak zapisanego trybu lub brak klucza w trybie API, pokaż modal
  document.getElementById('apiKeyModal').style.display = 'flex';
  console.log('No configuration found, showing modal');
  
  // Upewniamy się, że przycisk ma prawidłowy event listener
  const saveButton = document.getElementById('saveApiKey');
  if (saveButton) {
    // Usuwamy wszystkie istniejące event listenery (jeśli są)
    const newButton = saveButton.cloneNode(true);
    saveButton.parentNode.replaceChild(newButton, saveButton);
    
    // Dodajemy nowy event listener
    newButton.addEventListener('click', function() {
      console.log('Save button clicked');
      saveApiKey();
    });
  } else {
    console.error('Save button not found!');
  }
}

/**
 * Aktualizuje wskaźnik trybu w interfejsie
 * 
 * @param {string} mode - Tryb aplikacji ('api' lub 'prompt')
 */
function updateModeIndicator(mode) {
  const currentModeElem = document.getElementById('current-mode');
  const modeDescriptionElem = document.querySelector('.mode-description');
  
  if (currentModeElem) {
    if (mode === 'api') {
      currentModeElem.textContent = 'Tryb API (Claude)';
      if (modeDescriptionElem) {
        modeDescriptionElem.textContent = 'W tym trybie system automatycznie wysyła prompt do API Claude i prezentuje wyniki.';
      }
    } else {
      currentModeElem.textContent = 'Generowanie promptów (bez API)';
      if (modeDescriptionElem) {
        modeDescriptionElem.textContent = 'W tym trybie system wygeneruje zaawansowany prompt, który możesz skopiować i użyć z dowolnym modelem AI.';
      }
    }
  }
}

/**
 * Inicjalizuje obsługę zdarzeń dla interfejsu użytkownika
 */
function initializeEventListeners() {
  console.log('Initializing event listeners...');
  
  // Obsługa wyboru formy transmutacji
  document.querySelectorAll('.option-card[data-form]').forEach(card => {
    card.addEventListener('click', () => {
      const formId = card.getAttribute('data-form');
      selectTransmutationForm(formId);
    });
  });
  
  // Obsługa wyboru fazy alchemicznej
  document.querySelectorAll('.option-card[data-phase]').forEach(card => {
    card.addEventListener('click', () => {
      const phaseId = card.getAttribute('data-phase');
      selectAlchemicalPhase(phaseId);
    });
  });
  
  // Obsługa pola tematu
  document.getElementById('topic-input').addEventListener('input', updateSubmitButtonState);
  
  // Obsługa przycisku transmutacji
  document.getElementById('transmute-btn').addEventListener('click', startTransmutation);
  
  // Obsługa dialogu
  document.getElementById('dialog-send').addEventListener('click', sendDialogMessage);
  document.getElementById('dialog-input').addEventListener('keypress', e => {
    if (e.key === 'Enter') sendDialogMessage();
  });
  
  // Obsługa zapisywania klucza API
  const saveButton = document.getElementById('saveApiKey');
  if (saveButton) {
    saveButton.addEventListener('click', function() {
      console.log('Save button clicked from event listener');
      saveApiKey();
    });
  }
  
  // Obsługa otwarcia konfiguracji API
  document.getElementById('configureApi').addEventListener('click', e => {
    e.preventDefault();
    
    // Odświeżamy event listenery przed pokazaniem modalu
    const saveButton = document.getElementById('saveApiKey');
    if (saveButton) {
      // Usuwamy wszystkie istniejące event listenery (jeśli są)
      const newButton = saveButton.cloneNode(true);
      saveButton.parentNode.replaceChild(newButton, saveButton);
      
      // Dodajemy nowy event listener
      newButton.addEventListener('click', function() {
        console.log('Save button clicked from reconfiguration');
        saveApiKey();
      });
    }
    
    document.getElementById('apiKeyModal').style.display = 'flex';
  });
  
  // Obsługa zmiany trybu
  document.querySelectorAll('input[name="atanor-mode"]').forEach(radio => {
    radio.addEventListener('change', function() {
      const apiConfigSection = document.getElementById('apiConfigSection');
      if (this.value === 'api') {
        apiConfigSection.style.display = 'block';
      } else {
        apiConfigSection.style.display = 'none';
      }
    });
  });
  
  // Inicjalizacja wyświetlania sekcji konfiguracji API na podstawie wybranego trybu
  const currentMode = document.querySelector('input[name="atanor-mode"]:checked');
  if (currentMode && currentMode.value !== 'api') {
    const apiConfigSection = document.getElementById('apiConfigSection');
    if (apiConfigSection) {
      apiConfigSection.style.display = 'none';
    }
  }
}

/**
 * Inicjalizuje interfejs parametrów transmutacji
 */
function initializeParametersUI() {
  const parametersContainer = document.getElementById('parameters-container');
  if (!parametersContainer) return;
  
  // Czyścimy kontener parametrów
  parametersContainer.innerHTML = '';
  
  // Początkowo kontener jest pusty, parametry będą dodawane
  // po wyborze formy transmutacji
}

/**
 * Obsługuje wybór sefiry
 * 
 * @param {string} sefirahId - ID wybranej sefiry
 * @param {Object} pathInfo - Opcjonalne informacje o ścieżce, jeśli wybrano predefiniowaną ścieżkę
 */
function handleSefirahSelect(sefirahId, pathInfo) {
  appState.selectedSefirah = sefirahId;
  
  // Aktualizacja metadanych w interfejsie
  const sefirahName = AtanorDatabase.sefirot[sefirahId].name;
  document.getElementById('meta-sefirah').textContent = `Sefira: ${sefirahName}`;
  
  // Aktualizacja stanu przycisku transmutacji
  updateSubmitButtonState();
}

/**
 * Obsługuje wybór formy transmutacji
 * 
 * @param {string} formId - ID wybranej formy
 */
function selectTransmutationForm(formId) {
  appState.selectedTransmutationForm = formId;
  
  // Aktualizacja wizualna wybranej formy
  document.querySelectorAll('.option-card[data-form]').forEach(card => {
    card.classList.toggle('selected', card.getAttribute('data-form') === formId);
  });
  
  // Aktualizacja metadanych w interfejsie
  const formName = AtanorDatabase.transmutationForms[formId].name;
  document.getElementById('meta-form').textContent = `Forma: ${formName}`;
  
  // Aktualizacja parametrów dla wybranej formy
  updateParameters(formId);
  
  // Aktualizacja stanu przycisku transmutacji
  updateSubmitButtonState();
}

/**
 * Obsługuje wybór fazy alchemicznej
 * 
 * @param {string} phaseId - ID wybranej fazy
 */
function selectAlchemicalPhase(phaseId) {
  appState.selectedAlchemicalPhase = phaseId;
  
  // Aktualizacja wizualna wybranej fazy
  document.querySelectorAll('.option-card[data-phase]').forEach(card => {
    card.classList.toggle('selected', card.getAttribute('data-phase') === phaseId);
  });
  
  // Aktualizacja metadanych w interfejsie
  const phaseName = AtanorDatabase.alchemicalPhases[phaseId].name;
  document.getElementById('meta-phase').textContent = `Faza: ${phaseName}`;
  
  // Aktualizacja stanu przycisku transmutacji
  updateSubmitButtonState();
}

/**
 * Aktualizuje parametry w interfejsie dla wybranej formy transmutacji
 * 
 * @param {string} formId - ID formy transmutacji
 */
function updateParameters(formId) {
  const parametersContainer = document.getElementById('parameters-container');
  if (!parametersContainer) return;
  
  // Czyścimy kontener parametrów
  parametersContainer.innerHTML = '';
  
  // Dodajemy nagłówek sekcji
  const header = document.createElement('h2');
  header.textContent = 'Parametry transmutacji';
  parametersContainer.appendChild(header);
  
  const form = AtanorDatabase.transmutationForms[formId];
  if (!form || !form.parameters) return;
  
  // Renderowanie parametrów specyficznych dla wybranej formy
  Object.entries(form.parameters).forEach(([paramId, paramConfig]) => {
    const parameterControl = document.createElement('div');
    parameterControl.className = 'parameter-control';
    
    // Etykieta parametru
    const label = document.createElement('label');
    label.textContent = paramConfig.name;
    label.title = paramConfig.description;
    parameterControl.appendChild(label);
    
    // Określenie typu parametru na podstawie jego struktury
    if (paramConfig.range) {
      // Parametr typu range (np. analysisDepth, dialecticalTension)
      const slider = document.createElement('input');
      slider.type = 'range';
      slider.min = paramConfig.range[0];
      slider.max = paramConfig.range[1];
      slider.value = appState.parameters[paramId] || paramConfig.default;
      
      const valueDisplay = document.createElement('div');
      valueDisplay.className = 'parameter-value';
      valueDisplay.textContent = `${slider.value}/${paramConfig.range[1]}`;
      
      slider.addEventListener('input', () => {
        appState.parameters[paramId] = parseInt(slider.value);
        valueDisplay.textContent = `${slider.value}/${paramConfig.range[1]}`;
      });
      
      parameterControl.appendChild(slider);
      parameterControl.appendChild(valueDisplay);
    } 
    else if (paramConfig.options) {
      // Parametr typu select (np. temporalScope, systemLevel, synthesisType)
      if (Array.isArray(paramConfig.options)) {
        const select = document.createElement('select');
        
        paramConfig.options.forEach(option => {
          const optionElement = document.createElement('option');
          // Sprawdzamy strukturę opcji
          if (typeof option === 'string') {
            // Prosta lista wartości
            optionElement.value = option;
            optionElement.textContent = option;
          } else {
            // Obiekt z wartością i etykietą
            optionElement.value = option;
            optionElement.textContent = paramConfig.labels ? paramConfig.labels[option] : option;
          }
          select.appendChild(optionElement);
        });
        
        select.value = appState.parameters[paramId] || paramConfig.default;
        
        select.addEventListener('change', () => {
          appState.parameters[paramId] = select.value;
        });
        
        parameterControl.appendChild(select);
      }
      else if (typeof paramConfig.options === 'object' && !Array.isArray(paramConfig.options)) {
        // Checkbox dla parametrów typu multiselect (np. perspectives)
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'multiselect-options';
        
        Object.entries(paramConfig.options).forEach(([optionKey, optionDesc]) => {
          const optionContainer = document.createElement('div');
          optionContainer.className = 'multiselect-option';
          
          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.id = `param-${paramId}-${optionKey}`;
          checkbox.value = optionKey;
          checkbox.checked = (appState.parameters[paramId] || []).includes(optionKey);
          
          const optionLabel = document.createElement('label');
          optionLabel.htmlFor = checkbox.id;
          optionLabel.textContent = optionKey;
          optionLabel.title = optionDesc;
          
          checkbox.addEventListener('change', () => {
            if (!Array.isArray(appState.parameters[paramId])) {
              appState.parameters[paramId] = [];
            }
            
            if (checkbox.checked) {
              if (!appState.parameters[paramId].includes(optionKey)) {
                appState.parameters[paramId].push(optionKey);
              }
            } else {
              appState.parameters[paramId] = appState.parameters[paramId].filter(v => v !== optionKey);
            }
          });
          
          optionContainer.appendChild(checkbox);
          optionContainer.appendChild(optionLabel);
          optionsContainer.appendChild(optionContainer);
        });
        
        parameterControl.appendChild(optionsContainer);
      }
    }
    
    parametersContainer.appendChild(parameterControl);
  });
}

/**
 * Aktualizuje stan przycisku rozpoczęcia transmutacji
 */
function updateSubmitButtonState() {
  const transmuteBtn = document.getElementById('transmute-btn');
  if (!transmuteBtn) return;
  
  const topic = document.getElementById('topic-input').value.trim();
  appState.topic = topic;
  
  // Przycisk jest aktywny tylko gdy wszystkie wymagane pola są wypełnione
  const isComplete = appState.selectedSefirah && 
                    appState.selectedTransmutationForm && 
                    appState.selectedAlchemicalPhase &&
                    topic !== '';
  
  transmuteBtn.disabled = !isComplete || appState.isTransmuting;
}

/**
 * Rozpoczyna proces transmutacji
 */
async function startTransmutation() {
  // Sprawdzenie, czy wszystkie wymagane dane są dostępne
  if (!appState.selectedSefirah || 
      !appState.selectedTransmutationForm || 
      !appState.selectedAlchemicalPhase ||
      !appState.topic) {
    alert('Proszę wybrać sefirotę, formę transmutacji, fazę alchemiczną i wprowadzić temat');
    return;
  }
  
  // Sprawdzenie, czy jest dostępny klucz API w trybie API
  if (appState.appMode === 'api' && !appState.apiKey) {
    document.getElementById('apiKeyModal').style.display = 'flex';
    return;
  }
  
  // Aktualizacja stanu
  appState.isTransmuting = true;
  updateSubmitButtonState();
  
  // Wczytanie danych o wybranych elementach
  const sefirah = AtanorDatabase.sefirot[appState.selectedSefirah];
  const transmutationForm = AtanorDatabase.transmutationForms[appState.selectedTransmutationForm];
  const alchemicalPhase = AtanorDatabase.alchemicalPhases[appState.selectedAlchemicalPhase];
  
  // Aktualizacja metadanych w UI
  resultRenderer.updateMetadata({
    sefirahName: sefirah.name,
    formName: transmutationForm.name,
    phaseName: alchemicalPhase.name
  });
  
  // Generowanie promptu
  const prompt = promptGenerator.generatePrompt(
    appState.selectedSefirah,
    appState.selectedTransmutationForm,
    appState.selectedAlchemicalPhase,
    appState.topic,
    appState.parameters
  );
  
  // Tryb prompt-only - wyświetl prompt zamiast wysyłać go do API
  if (appState.appMode === 'prompt') {
    displayPrompt(prompt, transmutationForm);
    appState.isTransmuting = false;
    updateSubmitButtonState();
    return;
  }
  
  // Tryb API - wysyłanie promptu do modelu
  try {
    // Pokazanie wskaźnika ładowania
    resultRenderer.clearResults();
    resultRenderer.showLoading();
    
    // Wysłanie promptu do modelu AI
    const response = await sendToAI(prompt);
    
    // Zapisanie historii dialogu
    appState.dialogHistory.push({ role: 'user', content: prompt });
    appState.dialogHistory.push({ role: 'assistant', content: response });
    
    // Wyświetlenie odpowiedzi
    resultRenderer.renderResponse(response, {
      transmutationForm: transmutationForm
    });
  } catch (error) {
    alert(`Wystąpił błąd podczas transmutacji: ${error.message}`);
    resultRenderer.hideLoading();
  } finally {
    // Aktualizacja stanu
    appState.isTransmuting = false;
    updateSubmitButtonState();
  }
}

/**
 * Wyświetla wygenerowany prompt do skopiowania
 * 
 * @param {string} prompt - Wygenerowany prompt
 * @param {Object} transmutationForm - Informacje o formie transmutacji
 */
function displayPrompt(prompt, transmutationForm) {
  // Czyszczenie poprzednich wyników
  resultRenderer.clearResults();
  
  // Tworzenie kontenera dla wyświetlenia promptu
  const promptDisplayContainer = document.createElement('div');
  promptDisplayContainer.className = 'prompt-display-container';
  
  // Nagłówek z tytułem i przyciskiem kopiowania
  const promptHeader = document.createElement('div');
  promptHeader.className = 'prompt-display-header';
  
  const promptTitle = document.createElement('h3');
  promptTitle.textContent = 'Wygenerowany prompt dla transmutacji';
  
  const copyButton = document.createElement('button');
  copyButton.className = 'copy-prompt-btn';
  copyButton.innerHTML = '<i class="fas fa-copy"></i> Kopiuj prompt';
  copyButton.addEventListener('click', () => {
    const textarea = document.getElementById('prompt-textarea');
    textarea.select();
    document.execCommand('copy');
    copyButton.innerHTML = '<i class="fas fa-check"></i> Skopiowano!';
    setTimeout(() => {
      copyButton.innerHTML = '<i class="fas fa-copy"></i> Kopiuj prompt';
    }, 2000);
  });
  
  // Dodanie przycisku dla nowej transmutacji
  const newTransmutationButton = document.createElement('button');
  newTransmutationButton.className = 'copy-prompt-btn';
  newTransmutationButton.style.marginLeft = '10px';
  newTransmutationButton.innerHTML = '<i class="fas fa-plus"></i> Nowa transmutacja';
  newTransmutationButton.addEventListener('click', () => {
    // Resetowanie UI do stanu początkowego
    resetTransmutationUI();
  });
  
  promptHeader.appendChild(promptTitle);
  promptHeader.appendChild(copyButton);
  promptHeader.appendChild(newTransmutationButton);
  
  // Treść promptu
  const textarea = document.createElement('textarea');
  textarea.id = 'prompt-textarea';
  textarea.className = 'prompt-display-textarea';
  textarea.readOnly = true;
  textarea.value = prompt;
  
  // Instrukcje użycia
  const promptInstructions = document.createElement('div');
  promptInstructions.className = 'prompt-instructions';
  
  const instructionsTitle = document.createElement('h4');
  instructionsTitle.textContent = 'Jak użyć tego promptu:';
  
  const instructionsList = document.createElement('ol');
  instructionsList.innerHTML = `
    <li>Skopiuj powyższy prompt klikając przycisk "Kopiuj prompt".</li>
    <li>Przejdź do wybranego systemu AI (np. ChatGPT, Claude, inne).</li>
    <li>Wklej prompt do okna rozmowy i wyślij.</li>
    <li>System AI przeprowadzi transmutację zgodnie z wybranymi parametrami.</li>
    <li>Aby uzyskać najlepsze wyniki, zalecamy modele o dużej mocy obliczeniowej (np. GPT-4, Claude Opus).</li>
  `;
  
  promptInstructions.appendChild(instructionsTitle);
  promptInstructions.appendChild(instructionsList);
  
  // Łączenie wszystkich elementów
  promptDisplayContainer.appendChild(promptHeader);
  promptDisplayContainer.appendChild(textarea);
  promptDisplayContainer.appendChild(promptInstructions);
  
  // Dodanie kontenera do wyników
  resultRenderer.stagesContainer.innerHTML = '';
  resultRenderer.stagesContainer.appendChild(promptDisplayContainer);
  resultRenderer.stagesContainer.style.display = 'block';
  
  // Przewinięcie do wyników
  resultRenderer.resultContainer.scrollIntoView({ behavior: 'smooth' });
  
  // Aktualizacja stanu aplikacji
  appState.isTransmuting = false;
  updateSubmitButtonState();
}

/**
 * Resetuje interfejs do stanu początkowego, aby umożliwić nową transmutację
 */
function resetTransmutationUI() {
  // Resetowanie pól wejściowych
  document.getElementById('topic-input').value = '';
  appState.topic = '';
  
  // Ukrywanie panelu wyników
  resultRenderer.clearResults();
  
  // Resetowanie flagów stanu
  appState.isTransmuting = false;
  
  // Wyświetlenie komunikatu powitalnego
  document.querySelector('.welcome-message').style.display = 'block';
  
  // Aktualizacja stanu przycisku
  updateSubmitButtonState();
}

/**
 * Wysyła wiadomość w dialogu
 */
async function sendDialogMessage() {
  const dialogInput = document.getElementById('dialog-input');
  const message = dialogInput.value.trim();
  
  if (message === '' || appState.isTransmuting) return;
  
  // Czyszczenie pola wprowadzania
  dialogInput.value = '';
  
  // Dodanie wiadomości użytkownika do interfejsu
  resultRenderer.addMessage(message, 'user');
  
  // Sprawdzenie, czy tryb API jest aktywny
  if (appState.appMode !== 'api') {
    resultRenderer.addMessage('Funkcja dialogu jest dostępna tylko w trybie API. Przełącz się na tryb API, aby kontynuować dialog.', 'ai');
    return;
  }
  
  // Aktualizacja stanu
  appState.isTransmuting = true;
  
  // Generowanie kontekstu dla promptu kontynuacji
  const context = {
    sefirahId: appState.selectedSefirah,
    transmutationFormId: appState.selectedTransmutationForm,
    alchemicalPhaseId: appState.selectedAlchemicalPhase,
    topic: appState.topic
  };
  
  try {
    // Generowanie promptu kontynuującego dialog
    const prompt = promptGenerator.generateContinuationPrompt(message, context);
    
    // Wysłanie promptu do modelu AI
    const response = await sendToAI(prompt, appState.dialogHistory);
    
    // Zapisanie historii dialogu
    appState.dialogHistory.push({ role: 'user', content: prompt });
    appState.dialogHistory.push({ role: 'assistant', content: response });
    
    // Wyświetlenie odpowiedzi
    resultRenderer.addMessage(response, 'ai');
  } catch (error) {
    alert(`Wystąpił błąd podczas dialogu: ${error.message}`);
  } finally {
    // Aktualizacja stanu
    appState.isTransmuting = false;
  }
}

/**
 * Wysyła prompt do modelu AI i zwraca odpowiedź
 * 
 * @param {string} prompt - Prompt do wysłania
 * @param {Array} conversationHistory - Opcjonalnie historia konwersacji
 * @returns {Promise<string>} Obietnica zawierająca odpowiedź modelu
 */
async function sendToAI(prompt, conversationHistory = []) {
  // Konstrukcja wiadomości z historią konwersacji
  const messages = [
    ...conversationHistory,
    { role: "user", content: prompt }
  ];
  
  try {
    // W tej implementacji używamy Claude API, ale można dostosować do innego modelu
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': appState.apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: "claude-3-opus-20240229", // Możesz zmienić na inny model Claude
        max_tokens: 4000,
        messages: messages
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API error: ${errorData.error?.message || response.statusText}`);
    }
    
    const data = await response.json();
    return data.content[0].text;
  } catch (error) {
    console.error('Error communicating with AI model:', error);
    throw error;
  }
}

/**
 * Zapisuje klucz API i tryb w localStorage
 */
function saveApiKey() {
  console.log('Executing saveApiKey() function');
  
  try {
    const selectedModeElement = document.querySelector('input[name="atanor-mode"]:checked');
    if (!selectedModeElement) {
      console.error('No mode selected');
      alert('Proszę wybrać tryb działania aplikacji');
      return;
    }
    
    const selectedMode = selectedModeElement.value;
    console.log(`Selected mode: ${selectedMode}`);
    appState.appMode = selectedMode;
    
    if (selectedMode === 'api') {
      const apiKeyInput = document.getElementById('apiKeyInput');
      if (!apiKeyInput) {
        console.error('API key input not found');
        return;
      }
      
      const apiKey = apiKeyInput.value.trim();
      
      if (apiKey === '') {
        alert('Proszę wprowadzić prawidłowy klucz API lub wybrać tryb generowania promptów');
        return;
      }
      
      // Zapisanie klucza API
      localStorage.setItem('atanor-api-key', apiKey);
      localStorage.setItem('atanor-mode', 'api');
      appState.apiKey = apiKey;
      console.log('API key saved');
    } else {
      // Tryb prompt - nie potrzeba klucza
      localStorage.setItem('atanor-mode', 'prompt');
      localStorage.removeItem('atanor-api-key');
      appState.apiKey = null;
      console.log('Prompt mode saved, API key removed');
    }
    
    // Aktualizacja wskaźnika trybu
    updateModeIndicator(selectedMode);
    
    // Ukrycie modalu
    const modal = document.getElementById('apiKeyModal');
    if (modal) {
      modal.style.display = 'none';
      console.log('Modal hidden');
    } else {
      console.error('Modal not found');
    }
  } catch (error) {
    console.error('Error in saveApiKey function:', error);
    alert('Wystąpił błąd podczas zapisywania konfiguracji. Spróbuj ponownie.');
  }
}
