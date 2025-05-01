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
      console.error('Element tooltip nie został znaleziony');
    }
    
    // Dane o sefirotach i ścieżkach są pobierane z globalnego AtanorDatabase
    this.sefirotData = this.prepareSefirotData();
    this.pathwaysData = AtanorDatabase.pathways;
    
    // Inicjalizacja drzewa
    this.initializeTree();
  }
  
  /**
   * Przygotowuje dane o sefirotach do wizualizacji
   * 
   * @private
   * @returns {Array} Tablica z danymi sefirot
   */
  prepareSefirotData() {
    const sefirotData = [];
    
    for (const [id, sefirah] of Object.entries(AtanorDatabase.sefirot)) {
      sefirotData.push({
        id: id,
        name: sefirah.name,
        translation: sefirah.translation,
        symbol: sefirah.symbol,
        x: sefirah.coordinates.x,
        y: sefirah.coordinates.y,
        color: sefirah.color,
        description: `${sefirah.translation} - ${sefirah.nature}`
      });
    }
    
    return sefirotData;
  }
  
  /**
   * Inicjalizuje wizualizację Drzewa Życia za pomocą D3.js
   * 
   * @private
   */
  initializeTree() {
    const svg = d3.select(`#${this.containerId}`);
    
    // Rysowanie ścieżek między sefirotami
    svg.selectAll("line")
      .data(this.pathwaysData)
      .enter()
      .append("line")
      .attr("x1", d => this.getSefirahById(d.source).x)
      .attr("y1", d => this.getSefirahById(d.source).y)
      .attr("x2", d => this.getSefirahById(d.target).x)
      .attr("y2", d => this.getSefirahById(d.target).y)
      .attr("class", "path");
    
    // Rysowanie kół sefirot
    const sefirotNodes = svg.selectAll("circle")
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
  }
  
  /**
   * Obsługuje kliknięcie na sefirah
   * 
   * @private
   * @param {Object} sefirah - Dane sefiry, która została kliknięta
   */
  handleSefirahClick(sefirah) {
    // Aktualizacja wybranej sefiry
    this.selectedSefirah = sefirah.id;
    
    // Wizualna aktualizacja wyboru
    d3.selectAll("circle.sefirah").classed("selected", false);
    d3.select(`#${sefirah.id}`).classed("selected", true);
    
    // Wywołanie callbacku
    if (typeof this.onSefirahSelect === 'function') {
      this.onSefirahSelect(sefirah.id);
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
    
    this.tooltip.innerHTML = `
      <h3>${sefirah.name} (${sefirah.translation})</h3>
      <p>${sefirah.description}</p>
    `;
    
    // Pozycjonowanie tooltipa
    const rect = event.target.getBoundingClientRect();
    const svgRect = document.getElementById(this.containerId).getBoundingClientRect();
    
    const tooltipX = rect.left + window.scrollX - svgRect.left + rect.width / 2;
    const tooltipY = rect.top + window.scrollY - svgRect.top;
    
    this.tooltip.style.left = `${tooltipX}px`;
    this.tooltip.style.top = `${tooltipY - 70}px`; // Nad sefirah
    this.tooltip.style.opacity = 1;
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
   * Pobiera dane sefiry po jej ID
   * 
   * @private
   * @param {string} id - ID sefiry
   * @returns {Object} Dane sefiry
   */
  getSefirahById(id) {
    return this.sefirotData.find(sefirah => sefirah.id === id);
  }
  
  /**
   * Wybiera sefirah programowo (bez kliknięcia użytkownika)
   * 
   * @param {string} sefirahId - ID sefiry do wybrania
   */
  selectSefirah(sefirahId) {
    const sefirah = this.getSefirahById(sefirahId);
    if (sefirah) {
      this.handleSefirahClick(sefirah);
    }
  }
  
  /**
   * Podświetla predefiniowaną ścieżkę sefirotyczną
   * 
   * @param {string} pathId - ID ścieżki (np. "analytical", "pragmatic")
   */
  highlightPath(pathId) {
    // Resetowanie poprzedniego wyboru
    d3.selectAll("circle.sefirah").classed("selected", false);
    
    const path = AtanorDatabase.paths[pathId];
    if (!path) return;
    
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
  }
}

// Instancja zostanie utworzona w main.js po załadowaniu DOM
