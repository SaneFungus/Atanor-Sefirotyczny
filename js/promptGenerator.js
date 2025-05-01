/**
 * Generator promptów dla systemu Atanor Sefirotyczny
 * Odpowiada za konstruowanie specjalistycznych promptów na podstawie wyborów użytkownika
 */

class PromptGenerator {
  /**
   * Inicjalizacja generatora promptów
   */
  constructor() {
    // Obiekt bazowy AtanorDatabase jest zdefiniowany w atanorDatabase.js
    // i dostępny globalnie
    if (typeof AtanorDatabase === 'undefined') {
      console.error('AtanorDatabase nie jest dostępny. Upewnij się, że atanorDatabase.js jest załadowany przed promptGenerator.js');
    }
  }

  /**
   * Główna metoda generująca prompt na podstawie wybranych parametrów
   * 
   * @param {string} sefirahId - ID wybranej sefiry (np. "keter", "tiferet")
   * @param {string} transmutationFormId - ID formy transmutacji (np. "separatio", "coniunctio")
   * @param {string} alchemicalPhaseId - ID fazy alchemicznej (np. "nigredo", "albedo")
   * @param {string} topic - Temat do transmutacji
   * @param {Object} parameters - Parametry specyficzne dla wybranej formy transmutacji
   * @returns {string} Wygenerowany prompt gotowy do wysłania do modelu AI
   */
  generatePrompt(sefirahId, transmutationFormId, alchemicalPhaseId, topic, parameters = {}) {
    // Pobranie danych z bazy wiedzy
    const sefirah = AtanorDatabase.sefirot[sefirahId];
    const transmutationForm = AtanorDatabase.transmutationForms[transmutationFormId];
    const alchemicalPhase = AtanorDatabase.alchemicalPhases[alchemicalPhaseId];
    
    if (!sefirah || !transmutationForm || !alchemicalPhase) {
      console.error('Nieprawidłowe parametry wejściowe dla generatora promptów');
      return '';
    }
    
    // Konstrukcja promptu - podstawowa struktura
    let prompt = this._generatePromptHeader(sefirah, transmutationForm, alchemicalPhase, topic);
    
    // Dodanie specyficznych parametrów
    prompt += this._generateParametersSection(transmutationFormId, parameters);
    
    // Dodanie instrukcji strukturyzacji odpowiedzi
    prompt += this._generateStructuringInstructions(sefirah, transmutationForm, alchemicalPhase);
    
    return prompt;
  }
  
  /**
   * Generuje nagłówek promptu z ogólnymi informacjami o transmutacji
   * 
   * @private
   * @param {Object} sefirah - Obiekt z danymi wybranej sefiry
   * @param {Object} transmutationForm - Obiekt z danymi wybranej formy transmutacji
   * @param {Object} alchemicalPhase - Obiekt z danymi wybranej fazy alchemicznej
   * @param {string} topic - Temat do transmutacji
   * @returns {string} Nagłówek promptu
   */
  _generatePromptHeader(sefirah, transmutationForm, alchemicalPhase, topic) {
    let header = `Przeprowadź transmutację tematu "${topic}" zgodnie z następującymi parametrami:\n\n`;
    
    // Dodanie informacji o sefirze
    header += `SEFIRA: ${sefirah.name} (${sefirah.translation})\n`;
    header += `Funkcje epistemiczne ${sefirah.name}:\n`;
    sefirah.functions.forEach(func => {
      header += `- ${func}\n`;
    });
    header += '\n';
    
    // Dodanie informacji o formie transmutacji
    header += `FORMA TRANSMUTACJI: ${transmutationForm.name}\n`;
    header += `Natura: ${transmutationForm.nature}\n`;
    header += `Etapy:\n`;
    transmutationForm.stages.forEach((stage, index) => {
      header += `${index + 1}. ${stage.name} - ${stage.description}\n`;
    });
    header += '\n';
    
    // Dodanie informacji o fazie alchemicznej
    header += `FAZA ALCHEMICZNA: ${alchemicalPhase.name}\n`;
    header += `Natura: ${alchemicalPhase.nature}\n`;
    header += `Funkcje:\n`;
    alchemicalPhase.functions.forEach(func => {
      header += `- ${func}\n`;
    });
    header += '\n';
    
    return header;
  }
  
  /**
   * Generuje sekcję parametrów specyficznych dla formy transmutacji
   * 
   * @private
   * @param {string} transmutationFormId - ID formy transmutacji
   * @param {Object} parameters - Parametry specyficzne dla wybranej formy
   * @returns {string} Sekcja parametrów promptu
   */
  _generateParametersSection(transmutationFormId, parameters) {
    const transmutationForm = AtanorDatabase.transmutationForms[transmutationFormId];
    let paramSection = `PARAMETRY TRANSMUTACJI:\n`;
    
    if (transmutationFormId === 'separatio') {
      const analysisDepth = parameters.analysisDepth || transmutationForm.parameters.analysisDepth.default;
      paramSection += `- Głębia analizy: ${analysisDepth}/10\n`;
      
      const selectedPerspectives = parameters.perspectives || transmutationForm.parameters.perspectives.default;
      paramSection += `- Wybrane perspektywy:\n`;
      
      selectedPerspectives.forEach(perspectiveId => {
        const option = transmutationForm.parameters.perspectives.options.find(opt => opt.value === perspectiveId);
        if (option) {
          paramSection += `  * ${option.label}: ${option.description}\n`;
        }
      });
    } 
    else if (transmutationFormId === 'coagulatio') {
      const temporalScope = parameters.temporalScope || transmutationForm.parameters.temporalScope.default;
      const temporalOption = transmutationForm.parameters.temporalScope.options.find(opt => opt.value === temporalScope);
      paramSection += `- Zakres temporalny: ${temporalOption ? temporalOption.label : temporalScope}\n`;
      
      const systemLevel = parameters.systemLevel || transmutationForm.parameters.systemLevel.default;
      const systemOption = transmutationForm.parameters.systemLevel.options.find(opt => opt.value === systemLevel);
      paramSection += `- Poziom systemowy: ${systemOption ? systemOption.label : systemLevel}\n`;
    } 
    else if (transmutationFormId === 'coniunctio') {
      const dialecticalTension = parameters.dialecticalTension || transmutationForm.parameters.dialecticalTension.default;
      paramSection += `- Napięcie dialektyczne: ${dialecticalTension}/10\n`;
      
      const synthesisType = parameters.synthesisType || transmutationForm.parameters.synthesisType.default;
      const synthesisOption = transmutationForm.parameters.synthesisType.options.find(opt => opt.value === synthesisType);
      paramSection += `- Typ syntezy: ${synthesisOption ? synthesisOption.label : synthesisType}\n`;
      
      // Dodaj opis wybranego typu syntezy
      if (transmutationForm.synthesisTypes && transmutationForm.synthesisTypes[synthesisType]) {
        paramSection += `  ${transmutationForm.synthesisTypes[synthesisType]}\n`;
      }
    }
    
    return paramSection + '\n';
  }
  
  /**
   * Generuje instrukcje strukturyzacji odpowiedzi
   * 
   * @private
   * @param {Object} sefirah - Obiekt z danymi wybranej sefiry
   * @param {Object} transmutationForm - Obiekt z danymi wybranej formy transmutacji
   * @param {Object} alchemicalPhase - Obiekt z danymi wybranej fazy alchemicznej
   * @returns {string} Instrukcje strukturyzacji odpowiedzi
   */
  _generateStructuringInstructions(sefirah, transmutationForm, alchemicalPhase) {
    let instructions = `INSTRUKCJE STRUKTURYZACJI ODPOWIEDZI:\n`;
    
    // Instrukcja strukturyzacji według etapów transmutacji
    instructions += `1. Strukturyzuj odpowiedź zgodnie z etapami ${transmutationForm.name}, każdy etap oznacz wyraźnym nagłówkiem.\n`;
    
    // Instrukcja uwzględnienia funkcji epistemicznych sefiry
    instructions += `2. W każdym etapie uwzględnij funkcje epistemiczne ${sefirah.name}, szczególnie ${sefirah.functions[0].toLowerCase()}\n`;
    
    // Instrukcja dostosowania charakteru odpowiedzi do fazy alchemicznej
    instructions += `3. ${alchemicalPhase.promptModifier}\n`;
    
    // Instrukcja dot. stylu komunikacji
    instructions += `4. Styl komunikacji: ${alchemicalPhase.communicationStyle[0]}\n`;
    
    // Instrukcja dot. formatowania
    instructions += `5. Format etapów:\n`;
    instructions += `   - Zacznij od krótkiego opisu istoty danego etapu w kontekście tematu\n`;
    instructions += `   - Następnie przedstaw właściwą analizę lub syntezę\n`;
    instructions += `   - Zakończ każdy etap krótką konkluzją przygotowującą do następnego etapu\n`;
    
    // Dodatkowa instrukcja dla ostatniego etapu
    instructions += `6. W ostatnim etapie (${transmutationForm.stages[transmutationForm.stages.length - 1].name}) przedstaw syntezę całego procesu transmutacji\n`;
    
    return instructions;
  }
  
  /**
   * Generuje prompt kontynuujący dialog w kontekście aktualnej transmutacji
   * 
   * @param {string} userQuery - Zapytanie użytkownika
   * @param {Object} context - Kontekst aktualnej transmutacji (wybrana sefira, forma, faza)
   * @returns {string} Prompt kontynuujący dialog
   */
  generateContinuationPrompt(userQuery, context) {
    const { sefirahId, transmutationFormId, alchemicalPhaseId, topic } = context;
    
    const sefirah = AtanorDatabase.sefirot[sefirahId];
    const transmutationForm = AtanorDatabase.transmutationForms[transmutationFormId];
    const alchemicalPhase = AtanorDatabase.alchemicalPhases[alchemicalPhaseId];
    
    let prompt = `Kontynuuj dialog na temat transmutacji "${topic}" w kontekście:\n`;
    prompt += `- Sefira: ${sefirah.name} (${sefirah.translation})\n`;
    prompt += `- Forma transmutacji: ${transmutationForm.name}\n`;
    prompt += `- Faza alchemiczna: ${alchemicalPhase.name}\n\n`;
    
    prompt += `Pytanie użytkownika: "${userQuery}"\n\n`;
    
    prompt += `Pamiętaj, aby w odpowiedzi:\n`;
    prompt += `1. Zachować perspektywę wybranej sefiry (${sefirah.name})\n`;
    prompt += `2. Utrzymać charakter odpowiedni dla fazy ${alchemicalPhase.name}\n`;
    prompt += `3. Odnosić się do etapów ${transmutationForm.name} jeśli pytanie tego dotyczy\n`;
    prompt += `4. Utrzymać spójność z poprzednią transmutacją\n`;
    
    return prompt;
  }
}

// Eksport instancji generatora promptów jako globalnej zmiennej
const promptGenerator = new PromptGenerator();
