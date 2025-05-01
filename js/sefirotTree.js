/**
 * Moduł odpowiedzialny za wizualizację i interakcję z Drzewem Życia (Etz Chaim)
 * Wykorzystuje bibliotekę D3.js do renderowania interaktywnej wizualizacji
 */

class SefirotTree {
  /**
   * Inicjalizacja wizualizacji Drzewa Życia
   * 
   * @param {string} containerId - ID elementu SVG, w którym zostanie wyrenderowane drzewo
   * @param {Function} onSefirahSelect - Callback wywoływany po wyborze sefiry
   */
  constructor(containerId, onSefirahSelect) {
    this.containerId = containerId;
    this.onSefirahSelect = onSefirahSelect;
    this.selectedSefirah = null;
    
    // Inicjalizacja tooltipa
    this.tooltip = document.getElementById('tooltip');
    if (!this.tooltip) {
      console.warn('Element tooltip nie został znaleziony');
    }
    
    // Sprawdzenie dostępności AtanorDatabase
    if (typeof AtanorDatabase === 'undefined') {
      console.error('AtanorDatabase nie jest dostępny. Upewnij się, że atanorDatabase.js jest załadowany przed sefirotTree.js');
      // Utworzenie pustego obiektu, aby uniknąć błędów
      window.AtanorDatabase = {
        sefirot: {},
        pathways: []
      };
    }
    
    // Dane o sefirotach i ścieżkach
    this.sefirotData = this.prepareSefirotData();
    this.pathwaysData = Array.isArray(AtanorDatabase.pathways) ? AtanorDatabase.pathways : [];
    
    // Inicjalizacja drzewa
    this.initializeTree();
  }
  
  /**
   * Przygotowuje dane o sefirotach do wizualizacji z zabezpieczeniami
   * 
   * @private
   * @returns {Array} Tablica z danymi sefirot
   */
  prepareSefirotData() {
    const sefirotData = [];
    
    // Sprawdź, czy AtanorDatabase i sefirot istnieją
    if (!AtanorDatabase || !AtanorDatabase.sefirot) {
      console.error('AtanorDatabase.sefirot nie jest dostępne');
      return sefirotData; // Zwracamy pustą tablicę
    }
    
    // Domyślne pozycje dla sefirot na wypadek braku koordinat
    const defaultPositions = {
      keter: { x: 250, y: 50 },
      chokmah: { x: 150, y: 125 },
      binah: { x: 350, y: 125 },
      chesed: { x: 150, y: 225 },
      gevurah: { x: 350, y: 225 },
      tiferet: { x: 250, y: 275 },
      netzach: { x: 150, y: 375 },
      hod: { x: 350, y: 375 },
      yesod: { x: 250, y: 450 },
      malkuth: { x: 250, y: 550 }
    };
    
    try {
      for (const [id, sefirah] of Object.entries(AtanorDatabase.sefirot)) {
        if (!sefirah) continue; // Pomiń, jeśli sefira nie istnieje
        
        // Użyj domyślnych pozycji, jeśli coordinates nie są dostępne
        const defaultPosition = defaultPositions[id] || { x: 250, y: 100 + sefirotData.length * 50 };
        const coordinates = sefirah.coordinates || defaultPosition;
        const x = coordinates.x !== undefined ? coordinates.x : defaultPosition.x;
        const y = coordinates.y !== undefined ? coordinates.y : defaultPosition.y;
        
        sefirotData.push({
          id: id,
          name: sefirah.name || id,
          translation: sefirah.translation || '',
          symbol: sefirah.symbol || '',
          x: x,
          y: y,
          color: sefirah.color || '#cccccc',
          description: `${sefirah.translation || ''} - ${sefirah.nature || ''}`
        });
      }
    } catch (error) {
      console.error('Błąd podczas przetwarzania danych sefirot:', error);
    }
    
    return sefirotData;
  }
  
  /**
   * Inicjalizuje wizualizację Drzewa Życia za pomocą D3.js z zabezpieczeniami
   * 
   * @private
   */
  initializeTree() {
    try {
      // Sprawdź, czy kontener istnieje
      const container = document.getElementById(this.containerId);
      if (!container) {
        console.error(`Element o ID "${this.containerId}" nie został znaleziony`);
        return;
      }
      
      const svg = d3.select(`#${this.containerId}`);
      
      // Sprawdź, czy mamy dane do wyświetlenia
      if (!this.sefirotData || this.sefirotData.length === 0) {
        console.error('Brak danych sefirot do wyświetlenia');
        return;
      }
      
      // Rysowanie ścieżek między sefirotami
      if (this.pathwaysData && this.pathwaysData.length > 0) {
        svg.selectAll("line")
          .data(this.pathwaysData)
          .enter()
          .append("line")
          .attr("x1", d => {
            const source = this.getSefirahById(d.source);
            return source ? source.x : 0;
          })
          .attr("y1", d => {
            const source = this.getSefirahById(d.source);
            return source ? source.y : 0;
          })
          .attr("x2", d => {
            const target = this.getSefirahById(d.target);
            return target ? target.x : 0;
          })
          .attr("y2", d => {
            const target = this.getSefirahById(d.target);
            return target ? target.y : 0;
          })
          .attr("class", "path");
      }
      
      // Rysowanie kół sefirot
      svg.selectAll("circle")
        .data(this.sefirotData)
        .enter()
        .append("circle")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("r", 30)
        .attr("class", "sefirah")
        .attr("id", d => d.id)
        .style("fill", d => d.color)
        .style("stroke", "#2d3748")
        .on("click", (event, d) => this.handleSefirahClick(d))
        .on("mouseover", (event, d) => this.showTooltip(event, d))
        .on("mouseout", () => this.hideTooltip());
      
      // Dodanie symboli hebrajskich w środku sefirot
      svg.selectAll("text.symbol")
        .data(this.sefirotData)
        .enter()
        .append("text")
        .attr("class", "sefirah-symbol")
        .attr("x", d => d.x)
        .attr("y", d => d.y + 5) // Lekkie przesunięcie w dół
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .style("pointer-events", "none") // Ignoruje zdarzenia myszy
        .text(d => d.symbol);
      
      // Dodanie etykiet pod sefirotami
      svg.selectAll("text.label")
        .data(this.sefirotData)
        .enter()
        .append("text")
        .attr("class", "sefirah-label")
        .attr("x", d => d.x)
        .attr("y", d => d.y + 45) // Pod sefirah
        .attr("text-anchor", "middle")
        .style("pointer-events", "none") // Ignoruje zdarzenia myszy
        .text(d => d.name);
    } catch (error) {
      console.error('Błąd podczas inicjalizacji drzewa:', error);
    }
  }
  
  /**
   * Obsługuje kliknięcie na sefirah
   * 
   * @private
   * @param {Object} sefirah - Dane sefiry, która została kliknięta
   */
  handleSefirahClick(sefirah) {
    try {
      // Aktualizacja wybranej sefiry
      this.selectedSefirah = sefirah.id;
      
      // Wizualna aktualizacja wyboru
      d3.selectAll("circle.sefirah").classed("selected", false);
      d3.select(`#${sefirah.id}`).classed("selected", true);
      
      // Wywołanie callbacku
      if (typeof this.onSefirahSelect === 'function') {
        this.onSefirahSelect(sefirah.id);
      }
    } catch (error) {
      console.error('Błąd podczas obsługi kliknięcia sefiry:', error);
    }
  }
  
  /**
   * Wyświetla tooltip z informacjami o sefirze
   * 
   * @private
   * @param {Event} event - Zdarzenie DOM mouseover
   * @param {Object} sefirah - Dane sefiry, nad którą jest kursor
   */
  showTooltip(event, sefirah) {
    if (!this.tooltip) return;
    
    try {
      this.tooltip.innerHTML = `
        <h3>${sefirah.name || ''} ${sefirah.translation ? `(${sefirah.translation})` : ''}</h3>
        <p>${sefirah.description || ''}</p>
      `;
      
      // Pozycjonowanie tooltipa
      const rect = event.target.getBoundingClientRect();
      const svgRect = document.getElementById(this.containerId).getBoundingClientRect();
      
      const tooltipX = rect.left + window.scrollX - svgRect.left + rect.width / 2;
      const tooltipY = rect.top + window.scrollY - svgRect.top;
      
      this.tooltip.style.left = `${tooltipX}px`;
      this.tooltip.style.top = `${tooltipY - 70}px`; // Nad sefirah
      this.tooltip.style.opacity = 1;
    } catch (error) {
      console.error('Błąd podczas wyświetlania tooltipa:', error);
    }
  }
  
  /**
   * Ukrywa tooltip
   * 
   * @private
   */
  hideTooltip() {
    if (this.tooltip) {
      this.tooltip.style.opacity = 0;
    }
  }
  
  /**
   * Pobiera dane sefiry po jej ID z zabezpieczeniami
   * 
   * @private
   * @param {string} id - ID sefiry
   * @returns {Object} Dane sefiry lub obiekt zastępczy
   */
  getSefirahById(id) {
    if (!id) return null;
    
    const sefirah = this.sefirotData.find(sefirah => sefirah.id === id);
    if (!sefirah) {
      console.warn(`Sefira o ID "${id}" nie została znaleziona`);
      // Zwróć obiekt zastępczy, aby uniknąć błędów
      return { x: 250, y: 250, id: id, name: id };
    }
    return sefirah;
  }
  
  /**
   * Wybiera sefirah programowo (bez kliknięcia użytkownika)
   * 
   * @param {string} sefirahId - ID sefiry do wybrania
   */
  selectSefirah(sefirahId) {
    try {
      const sefirah = this.getSefirahById(sefirahId);
      if (sefirah) {
        this.handleSefirahClick(sefirah);
      }
    } catch (error) {
      console.error(`Błąd podczas wybierania sefiry ${sefirahId}:`, error);
    }
  }
  
  /**
   * Podświetla predefiniowaną ścieżkę sefirotyczną
   * 
   * @param {string} pathId - ID ścieżki (np. "analytical", "pragmatic")
   */
  highlightPath(pathId) {
    try {
      // Resetowanie poprzedniego wyboru
      d3.selectAll("circle.sefirah").classed("selected", false);
      
      // Sprawdź, czy ścieżki są dostępne
      if (!AtanorDatabase.paths) {
        console.error('AtanorDatabase.paths nie jest dostępne');
        return;
      }
      
      const path = AtanorDatabase.paths[pathId];
      if (!path) {
        console.error(`Ścieżka o ID "${pathId}" nie została znaleziona`);
        return;
      }
      
      // Sprawdź, czy ścieżka ma sefirot
      if (!Array.isArray(path.sefirot) || path.sefirot.length === 0) {
        console.error(`Ścieżka "${pathId}" nie zawiera sefirot`);
        return;
      }
      
      // Podświetlenie wszystkich sefirot na ścieżce
      path.sefirot.forEach(sefirahId => {
        d3.select(`#${sefirahId}`).classed("selected", true);
      });
      
      // Aktualizacja wybranej sefiry (wybieramy pierwszą na ścieżce)
      this.selectedSefirah = path.sefirot[0];
      
      // Wywołanie callbacku z informacją o ścieżce
      if (typeof this.onSefirahSelect === 'function') {
        this.onSefirahSelect(path.sefirot[0], { pathId, path });
      }
    } catch (error) {
      console.error(`Błąd podczas podświetlania ścieżki ${pathId}:`, error);
    }
  }
}

// Instancja zostanie utworzona w main.js po załadowaniu DOM
