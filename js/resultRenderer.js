/**
 * Moduł odpowiedzialny za renderowanie rezultatów transmutacji
 * i obsługę interakcji z wynikami
 */

class ResultRenderer {
  /**
   * Inicjalizacja renderera rezultatów
   * 
   * @param {string} resultContainerId - ID kontenera, w którym będą wyświetlane wyniki
   * @param {string} stagesContainerId - ID kontenera dla etapów transmutacji
   * @param {string} loadingIndicatorId - ID wskaźnika ładowania
   * @param {string} dialogContainerId - ID kontenera dialogu
   */
  constructor(resultContainerId, stagesContainerId, loadingIndicatorId, dialogContainerId) {
    this.resultContainer = document.getElementById(resultContainerId);
    this.stagesContainer = document.getElementById(stagesContainerId);
    this.loadingIndicator = document.getElementById(loadingIndicatorId);
    this.dialogContainer = document.getElementById(dialogContainerId);
    
    if (!this.resultContainer || !this.stagesContainer || !this.loadingIndicator || !this.dialogContainer) {
      console.error('Nie znaleziono wszystkich wymaganych elementów dla ResultRenderer');
    }
    
    // Biblioteka Marked.js używana do parsowania Markdown
    if (typeof marked === 'undefined') {
      console.warn('Biblioteka marked.js nie jest dostępna. Formatowanie Markdown nie będzie działać.');
    }
  }
  
  /**
   * Wyświetla wskaźnik ładowania
   */
  showLoading() {
    if (this.stagesContainer) this.stagesContainer.style.display = 'none';
    if (this.dialogContainer) this.dialogContainer.style.display = 'none';
    if (this.loadingIndicator) this.loadingIndicator.style.display = 'flex';
  }
  
  /**
   * Ukrywa wskaźnik ładowania
   */
  hideLoading() {
    if (this.loadingIndicator) this.loadingIndicator.style.display = 'none';
  }
  
  /**
   * Aktualizuje metadane transmutacji w nagłówku wyników
   * 
   * @param {Object} metadata - Dane o aktualnej transmutacji
   */
  updateMetadata(metadata) {
    const { sefirahName, formName, phaseName } = metadata;
    
    const metaSefirah = document.getElementById('meta-sefirah');
    const metaForm = document.getElementById('meta-form');
    const metaPhase = document.getElementById('meta-phase');
    
    if (metaSefirah) metaSefirah.textContent = `Sefira: ${sefirahName}`;
    if (metaForm) metaForm.textContent = `Forma: ${formName}`;
    if (metaPhase) metaPhase.textContent = `Faza: ${phaseName}`;
  }
  
  /**
   * Parsuje odpowiedź AI na etapy transmutacji
   * 
   * @private
   * @param {string} response - Surowa odpowiedź od modelu AI
   * @param {Array} stageNames - Nazwy etapów transmutacji
   * @returns {Array} Tablica obiektów z etapami
   */
  _parseResponseToStages(response, stageNames) {
    // Jeśli nie ma nazw etapów, zwracamy całą odpowiedź jako jeden etap
    if (!stageNames || stageNames.length === 0) {
      return [{
        name: 'Odpowiedź',
        content: response
      }];
    }
    
    const stages = [];
    let currentContent = '';
    let currentStage = null;
    
    // Dodajemy znaczniki końca linii, aby ułatwić przetwarzanie
    const normalizedResponse = response.replace(/\r\n/g, '\n');
    const lines = normalizedResponse.split('\n');
    
    // Sprawdzenie, czy odpowiedź zawiera nagłówki etapów
    const containsStageHeaders = stageNames.some(stageName => {
      return lines.some(line => {
        return line.toLowerCase().includes(stageName.toLowerCase()) && 
               (line.startsWith('#') || line.startsWith('**') || line.startsWith('__'));
      });
    });
    
    // Jeśli nie ma nagłówków etapów, dzielimy odpowiedź heurystycznie
    if (!containsStageHeaders) {
      // Dzielimy odpowiedź na równe części odpowiadające liczbie etapów
      const stageLength = Math.ceil(lines.length / stageNames.length);
      
      for (let i = 0; i < stageNames.length; i++) {
        const start = i * stageLength;
        const end = Math.min((i + 1) * stageLength, lines.length);
        const stageContent = lines.slice(start, end).join('\n');
        
        stages.push({
          name: stageNames[i],
          content: stageContent
        });
      }
      
      return stages;
    }
    
    // Jeśli są nagłówki, parsujemy odpowiedź na podstawie nagłówków
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Sprawdzamy, czy linia zawiera nagłówek etapu
      const stageMatch = stageNames.find(stageName => {
        return line.toLowerCase().includes(stageName.toLowerCase()) && 
               (line.startsWith('#') || line.startsWith('**') || line.startsWith('__'));
      });
      
      if (stageMatch) {
        // Jeśli mamy już jakiś etap, zapisujemy go
        if (currentStage) {
          stages.push({
            name: currentStage,
            content: currentContent.trim()
          });
        }
        
        // Rozpoczynamy nowy etap
        currentStage = stageMatch;
        currentContent = '';
      } 
      else if (currentStage) {
        // Dodajemy linię do aktualnego etapu
        currentContent += line + '\n';
      }
    }
    
    // Dodajemy ostatni etap
    if (currentStage) {
      stages.push({
        name: currentStage,
        content: currentContent.trim()
      });
    }
    
    // Jeśli nie udało się sparsować etapów, zwracamy całą odpowiedź jako jeden etap
    if (stages.length === 0) {
      return [{
        name: 'Odpowiedź całościowa',
        content: response
      }];
    }
    
    return stages;
  }
  
  /**
   * Renderuje odpowiedź modelu AI jako strukturyzowane etapy transmutacji
   * 
   * @param {string} response - Odpowiedź modelu AI
   * @param {Object} transmutationDetails - Szczegóły procesu transmutacji
   */
  renderResponse(response, transmutationDetails) {
    this.hideLoading();
    
    const { transmutationForm } = transmutationDetails;
    const stageNames = transmutationForm.stages.map(stage => stage.name);
    
    // Parsowanie odpowiedzi na etapy
    const stages = this._parseResponseToStages(response, stageNames);
    
    // Czyszczenie kontenera etapów
    this.stagesContainer.innerHTML = '';
    
    // Renderowanie każdego etapu
    stages.forEach(stage => {
      const stageElement = document.createElement('div');
      stageElement.className = 'result-stage';
      
      // Nagłówek etapu
      const stageHeader = document.createElement('h3');
      stageHeader.textContent = stage.name;
      stageElement.appendChild(stageHeader);
      
      // Zawartość etapu (parsowanie Markdown, jeśli dostępne)
      const stageContent = document.createElement('div');
      stageContent.className = 'stage-content';
      
      if (typeof marked !== 'undefined') {
        stageContent.innerHTML = marked.parse(stage.content);
      } else {
        stageContent.innerText = stage.content;
      }
      
      stageElement.appendChild(stageContent);
      this.stagesContainer.appendChild(stageElement);
    });
    
    // Pokazanie kontenera etapów i dialogu
    this.stagesContainer.style.display = 'block';
    this.dialogContainer.style.display = 'flex';
    
    // Przewinięcie do wyników
    this.resultContainer.scrollIntoView({ behavior: 'smooth' });
  }
  
  /**
   * Renderuje kontener do wyświetlania promptu
   * 
   * @param {string} prompt - Wygenerowany prompt
   * @param {Object} options - Opcjonalne ustawienia wyświetlania
   */
  renderPromptDisplay(prompt, options = {}) {
    // Czyszczenie poprzednich wyników
    this.stagesContainer.innerHTML = '';
    
    // Tworzenie kontenera dla wyświetlenia promptu
    const promptDisplayContainer = document.createElement('div');
    promptDisplayContainer.className = 'prompt-display-container';
    
    // Nagłówek z tytułem i przyciskiem kopiowania
    const promptHeader = document.createElement('div');
    promptHeader.className = 'prompt-display-header';
    
    const promptTitle = document.createElement('h3');
    promptTitle.textContent = options.title || 'Wygenerowany prompt dla transmutacji';
    
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
    
    promptHeader.appendChild(promptTitle);
    promptHeader.appendChild(copyButton);
    
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
    this.stagesContainer.appendChild(promptDisplayContainer);
    this.stagesContainer.style.display = 'block';
    
    // Ukrycie kontenera dialogu w trybie prompt
    this.dialogContainer.style.display = 'none';
    
    // Przewinięcie do wyników
    this.resultContainer.scrollIntoView({ behavior: 'smooth' });
  }
  
  /**
   * Dodaje wiadomość do kontenera dialogu
   * 
   * @param {string} content - Treść wiadomości
   * @param {string} sender - Nadawca wiadomości ('user' lub 'ai')
   */
  addMessage(content, sender) {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}`;
    
    if (typeof marked !== 'undefined') {
      messageElement.innerHTML = marked.parse(content);
    } else {
      messageElement.textContent = content;
    }
    
    // Wstawiamy przed inputem dialogowym
    const dialogInput = this.dialogContainer.querySelector('.dialog-input');
    if (dialogInput) {
      this.dialogContainer.insertBefore(messageElement, dialogInput);
    } else {
      this.dialogContainer.appendChild(messageElement);
    }
    
    // Przewinięcie do nowej wiadomości
    messageElement.scrollIntoView({ behavior: 'smooth' });
    
    // Pokazanie kontenera dialogu jeśli był ukryty
    this.dialogContainer.style.display = 'flex';
  }
  
  /**
   * Czyści wyniki i przywraca stan początkowy
   */
  clearResults() {
    this.stagesContainer.innerHTML = '';
    this.stagesContainer.style.display = 'none';
    
    // Usuwamy wszystkie wiadomości, zachowując tylko dialog-input
    const dialogInput = this.dialogContainer.querySelector('.dialog-input');
    if (dialogInput) {
      this.dialogContainer.innerHTML = '';
      this.dialogContainer.appendChild(dialogInput);
    }
    
    this.dialogContainer.style.display = 'none';
  }
}

// Instancja zostanie utworzona w main.js po załadowaniu DOM
