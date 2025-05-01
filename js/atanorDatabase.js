// Baza wiedzy dla systemu Atanor Sefirotyczny
// Zawiera formalne definicje sefirot, procesów alchemicznych i ich interakcji

const AtanorDatabase = {
  // 1. DEFINICJE SEFIROT
  sefirot: {
    keter: {
      name: "Keter",
      translation: "Korona",
      symbol: "כתר",
      position: "Szczyt Drzewa Życia",
      nature: "Najwyższy punkt abstrakcji, ultimatywna jedność wszystkich przeciwieństw",
      functions: [
        "Identyfikacja fundamentalnej zasady jedności leżącej u podstaw zagadnienia",
        "Synteza złożonych informacji w najwyższą metazasadę",
        "Przekraczanie dychotomicznych ram konceptualnych",
        "Formułowanie pytań o ostateczną naturę fenomenu"
      ],
      exploration: [
        "Poszukiwanie ultimatywnej zasady jednośći",
        "Identyfikacja punktu, w którym wszystkie przeciwieństwa stają się jednością",
        "Transcendentalne ujęcie całości problematyki",
        "Zastosowanie najwyższego poziomu abstrakcji"
      ],
      promptPreface: "Zbadaj ultimatywną zasadę jedności leżącą u podstaw zagadnienia, transcendując wszelkie dualizmy i przeciwieństwa. Poszukaj metazasady organizującej całe pole konceptualne."
    },

    chokmah: {
      name: "Chokmah",
      translation: "Mądrość",
      symbol: "חכמה",
      position: "Szczyt prawej kolumny",
      nature: "Dynamiczna siła twórcza, czysta potencjalność, generatywna zasada",
      functions: [
        "Eksploracja generatywnych zasad i dynamicznych sił",
        "Identyfikacja pierwotnych sił napędowych zjawiska",
        "Rozpoznanie archetypowych wzorców leżących u podstaw konkretnych manifestacji",
        "Śledzenie przepływów energii i informacji w systemie"
      ],
      exploration: [
        "Badanie dynamiki generatywnej zjawiska",
        "Identyfikacja pierwotnych sił twórczych",
        "Rozpoznanie potencjalności jeszcze niezrealizowanych",
        "Mapowanie dynamiki transformacji i przepływów"
      ],
      promptPreface: "Zbadaj dynamiczne, generatywne siły leżące u podstaw zagadnienia. Zidentyfikuj pierwotne energie napędowe i wzorce przepływu informacji. Jakie są główne siły kształtujące ten temat?"
    },

    binah: {
      name: "Binah",
      translation: "Zrozumienie",
      symbol: "בינה",
      position: "Szczyt lewej kolumny",
      nature: "Struktura ograniczająca, forma nadająca kształt, determinacja i dyferencjacja",
      functions: [
        "Analiza struktur i ograniczeń",
        "Identyfikacja form i granic",
        "Rozpoznanie fundamentalnych dystynkcji i kategoryzacji",
        "Śledzenie wzorców ograniczających i determinujących"
      ],
      exploration: [
        "Krytyczna analiza struktur konceptualnych",
        "Identyfikacja fundamentalnych rozróżnień",
        "Precyzyjna kategoryzacja elementów",
        "Określenie granic badanego fenomenu"
      ],
      promptPreface: "Przeprowadź analizę struktur i ograniczeń w badanym zagadnieniu. Zidentyfikuj fundamentalne rozróżnienia i kategorie. Jakie są granice i definiujące dystynkcje tego tematu?"
    },

    chesed: {
      name: "Chesed",
      translation: "Miłosierdzie",
      symbol: "חסד",
      position: "Środek prawej kolumny",
      nature: "Zasada ekspansji, integracji i harmonizacji, hojność i otwartość",
      functions: [
        "Integracja różnorodnych elementów",
        "Identyfikacja zasad organizacyjnych i wzorców ładu",
        "Eksploracja możliwości ekspansji i rozwoju konceptu",
        "Poszukiwanie inkluzywnych syntez"
      ],
      exploration: [
        "Badanie potencjału integracyjnego",
        "Identyfikacja możliwości ekspansji i rozwoju",
        "Poszukiwanie inkluzywnych ram konceptualnych",
        "Tworzenie harmonijnych syntez"
      ],
      promptPreface: "Zbadaj potencjał integracyjny i ekspansywny zagadnienia. Jakie są możliwości włączenia różnorodnych elementów w harmonijną całość? Jak można rozwinąć i poszerzyć zakres tego tematu?"
    },

    gevurah: {
      name: "Gevurah",
      translation: "Siła",
      symbol: "גבורה",
      position: "Środek lewej kolumny",
      nature: "Zasada ograniczenia, dyscypliny, osądu i rozróżnienia, moc separacji",
      functions: [
        "Krytyczna analiza słabości i wyzwań",
        "Określenie niezbędnych granic i czynników dyscyplinujących",
        "Identyfikacja potencjalnych konfliktów i przeciwności",
        "Zastosowanie rygorystycznych testów i kryteriów"
      ],
      exploration: [
        "Krytyczna analiza granic i limitacji",
        "Identyfikacja wewnętrznych sprzeczności",
        "Rygorystyczna ocena trwałości koncepcji",
        "Testowanie wytrzymałości struktur konceptualnych"
      ],
      promptPreface: "Przeprowadź krytyczną analizę granic, ograniczeń i wewnętrznych sprzeczności zagadnienia. Jakie są słabe punkty, wyzwania i limity tego tematu? Zastosuj rygorystyczne kryteria oceny."
    },

    tiferet: {
      name: "Tiferet",
      translation: "Piękno",
      symbol: "תפארת",
      position: "Centrum Drzewa Życia",
      nature: "Harmonijny punkt równowagi, integracja przeciwieństw, estetyczna doskonałość",
      functions: [
        "Integracja przeciwstawnych perspektyw",
        "Tworzenie syntezy łączącej aspekty analityczne i holistyczne",
        "Poszukiwanie estetycznej harmonii i wewnętrznej spójności",
        "Balansowanie przeciwstawnych tendencji"
      ],
      exploration: [
        "Poszukiwanie punktu równowagi",
        "Harmonizacja przeciwstawnych aspektów",
        "Estetyczna integracja wszystkich elementów",
        "Tworzenie holistycznych syntez"
      ],
      promptPreface: "Poszukaj harmonijnego punktu równowagi w analizowanym temacie. Jak można zintegrować przeciwstawne perspektywy w estetyczną, spójną całość? Jaka synteza mogłaby zbalansować różne aspekty zagadnienia?"
    },

    netzach: {
      name: "Netzach",
      translation: "Zwycięstwo",
      symbol: "נצח",
      position: "Dolna część prawej kolumny",
      nature: "Siła emocjonalna i kulturowa, wartości estetyczne, intuicyjne zrozumienie",
      functions: [
        "Rozumienie kontekstów kulturowych i emocjonalnych",
        "Badanie aspektów estetycznych i wartości afektywnych",
        "Określenie rezonansu emocjonalnego i motywacyjnego potencjału",
        "Wykorzystanie intuicyjnego wglądu i empatycznego zrozumienia"
      ],
      exploration: [
        "Badanie emocjonalnych i kulturowych wymiarów",
        "Identyfikacja estetycznych aspektów",
        "Analiza intuicyjnego rezonansu",
        "Określenie motywacyjnego potencjału"
      ],
      promptPreface: "Zbadaj emocjonalne, kulturowe i estetyczne wymiary zagadnienia. Jaki jest intuicyjny rezonans tego tematu? Jakie wartości afektywne są z nim związane? Jaki ma potencjał motywacyjny?"
    },

    hod: {
      name: "Hod",
      translation: "Chwała",
      symbol: "הוד",
      position: "Dolna część lewej kolumny",
      nature: "Intelektualna precyzja, komunikacja, formalna struktura, racjonalne myślenie",
      functions: [
        "Formułowanie precyzyjnych, intelektualnie rygorystycznych ujęć",
        "Tworzenie eleganckich sformułowań i modeli",
        "Badanie aspektów komunikacyjnych i edukacyjnych",
        "Logiczna strukturyzacja argumentacji"
      ],
      exploration: [
        "Precyzyjna analiza logiczna",
        "Tworzenie formalnych modeli",
        "Badanie struktur komunikacyjnych",
        "Rygorystyczna konceptualizacja"
      ],
      promptPreface: "Przeprowadź precyzyjną analizę logiczną tematu. Opracuj formalny model konceptualny zagadnienia. Jak można najefektywniej zakomunikować i nauczać o tym temacie?"
    },

    yesod: {
      name: "Yesod",
      translation: "Fundament",
      symbol: "יסוד",
      position: "Przedostatnia pozycja na centralnej kolumnie",
      nature: "Podstawa praktyczna, gromadzenie i integracja, fundament dla manifestacji",
      functions: [
        "Synteza poprzednich wglądów w spójną podstawę",
        "Integracja abstrakcyjnych koncepcji z praktycznymi zastosowaniami",
        "Formułowanie przekonujących narracji łączących teorię z praktyką",
        "Tworzenie solidnych podstaw dla działania"
      ],
      exploration: [
        "Integracja wszystkich wglądów w spójny fundament",
        "Tworzenie podstawy dla praktycznych zastosowań",
        "Synteza abstrakcji w użyteczne modele",
        "Budowanie mostu między teorią a praktyką"
      ],
      promptPreface: "Zintegruj wszystkie wglądy w spójny fundament praktyczny. Jak można połączyć teoretyczne aspekty tematu z jego praktycznymi zastosowaniami? Jaka narracja mogłaby skutecznie połączyć teorię z praktyką?"
    },

    malkuth: {
      name: "Malkuth",
      translation: "Królestwo",
      symbol: "מלכות",
      position: "Podstawa Drzewa Życia",
      nature: "Konkretna manifestacja, fizyczna realizacja, praktyczna implementacja",
      functions: [
        "Tworzenie konkretnych, praktycznych aplikacji",
        "Formułowanie precyzyjnych instrukcji i planów działania",
        "Tworzenie namacalnych przykładów i studiów przypadków",
        "Testowanie teorii w materialnej rzeczywistości"
      ],
      exploration: [
        "Konkretne zastosowania praktyczne",
        "Studia przypadków i przykłady",
        "Materialne manifestacje koncepcji",
        "Testy i eksperymenty w realnych warunkach"
      ],
      promptPreface: "Opracuj konkretne, praktyczne zastosowania i manifestacje tematu. Jakie są namacalne przykłady i studia przypadków? Jak można przetestować teoretyczne aspekty w rzeczywistości materialnej?"
    }
  },

  // 2. PREDEFINIOWANE ŚCIEŻKI SEFIROTYCZNE
  paths: {
    analytical: {
      name: "Ścieżka Analityczna",
      sefirot: ["chokmah", "binah", "gevurah", "hod"],
      description: "Fokus na precyzyjnej analizie, strukturze i rygorystycznym podejściu",
      affinity: "Separatio",
      promptPreface: "Zastosuj analityczne, rygorystyczne i precyzyjne podejście do badanego tematu. Fokus analizy powinien być położony na strukturach, granicach, rozróżnieniach i logicznej precyzji."
    },
    
    pragmatic: {
      name: "Ścieżka Pragmatyczna",
      sefirot: ["chesed", "netzach", "yesod", "malkuth"],
      description: "Fokus na praktycznej realizacji, integracji i konkretnych zastosowaniach",
      affinity: "Coagulatio",
      promptPreface: "Zastosuj praktyczne, zorientowane na działanie podejście do badanego tematu. Fokus analizy powinien być położony na możliwościach implementacji, konkretnych zastosowaniach i materialnych manifestacjach."
    },
    
    integrative: {
      name: "Ścieżka Integracyjna",
      sefirot: ["keter", "tiferet", "yesod"],
      description: "Fokus na syntezie, harmonii i unifikacji przeciwieństw",
      affinity: "Coniunctio",
      promptPreface: "Zastosuj integracyjne, syntetyzujące podejście do badanego tematu. Fokus analizy powinien być położony na jednoczeniu przeciwieństw, znajdowaniu harmonii i tworzeniu spójnej całości."
    },
    
    complete: {
      name: "Ścieżka Pełna",
      sefirot: ["keter", "chokmah", "binah", "chesed", "gevurah", "tiferet", "netzach", "hod", "yesod", "malkuth"],
      description: "Holistyczna eksploracja wszystkich wymiarów zagadnienia",
      affinity: "Wszystkie formy",
      promptPreface: "Przeprowadź pełną, holistyczną eksplorację badanego tematu przez wszystkie warstwy poznania - od najwyższej abstrakcji do konkretnej manifestacji, uwzględniając zarówno aspekty analityczne, jak i syntetyczne."
    }
  },

  // 3. FORMY TRANSMUTACJI
  transmutationForms: {
    separatio: {
      name: "Separatio",
      agentName: "Primordialis Alembicus",
      nature: "Analityczna forma transmutacji, której fundamentalnym zadaniem jest destylacja esencji badanego zagadnienia poprzez oddzielenie istoty od przypadłości",
      stages: [
        {
          name: "Materia Prima",
          description: "Identyfikacja substratu epistemicznego - zbioru fundamentalnych elementów zagadnienia, ich natury i wzajemnych relacji",
          promptTemplate: "Zidentyfikuj substrat epistemiczny zagadnienia \"{topic}\". Mapuj pole konceptualne, kluczowe pojęcia i ich wzajemne powiązania. Ustal granice badanego fenomenu. Głębia analizy: {analysisDepth}/10.",
          outputFormat: {
            conceptualMap: "Mapa pola konceptualnego zagadnienia",
            keyElements: "Lista kluczowych elementów",
            boundaries: "Granice badanego fenomenu",
            preliminaryRelations: "Wstępna identyfikacja relacji między elementami"
          }
        },
        {
          name: "Calcinatio",
          description: "Aplikacja ogni analitycznych do badanej materii, zgodnie z wybranymi perspektywami",
          promptTemplate: "Aplikuj wybrane ognie analityczne do zagadnienia \"{topic}\":\n{selectedPerspectives}",
          perspectives: {
            ontological: "Ogień ontologiczny (pytanie o naturę bytu): Badaj fundamentalną strukturę rzeczywistości zagadnienia. Identyfikuj kategorie bytowe i modalne aspekty zjawiska. Analizuj status ontyczny kluczowych elementów.",
            epistemological: "Ogień epistemologiczny (pytanie o fundamenty poznania): Badaj warunki możliwości wiedzy o zagadnieniu. Identyfikuj źródła pewności i niepewności. Analizuj metody pozyskiwania i weryfikacji wiedzy.",
            axiological: "Ogień aksjologiczny (pytanie o wartości i hierarchie): Badaj implikacje wartościujące zagadnienia. Identyfikuj ukryte preferencje aksjologiczne. Analizuj hierarchie wartości leżące u podstaw koncepcji.",
            pragmatic: "Ogień pragmatyczny (pytanie o konsekwencje i użyteczność): Badaj praktyczne implikacje zagadnienia. Identyfikuj potencjalne zastosowania. Analizuj kryteria efektywności i użyteczności."
          },
          outputFormat: {
            analyticResults: "Wyniki aplikacji ogni analitycznych",
            deepStructure: "Głęboka struktura zagadnienia ujawniona przez proces Calcinatio",
            criticalInsights: "Krytyczne wglądy uzyskane przez zastosowanie wybranych perspektyw"
          }
        },
        {
          name: "Separatio",
          description: "Proceduralna destylacja oddzielająca elementy esencjalne od przypadkowych",
          promptTemplate: "Przeprowadź proceduralną destylację zagadnienia \"{topic}\", oddzielając elementy esencjalne od przypadkowych. Zastosuj kryteria niezbędności i wystarczalności. Przeprowadź testy kontrfaktyczne. Rozpoznaj elementy lotne (zmienne) od utrwalonych (stałych). Zidentyfikuj proporcje elementarne w badanym fenomenie.",
          outputFormat: {
            essentialElements: "Elementy esencjalne zagadnienia",
            accidentalElements: "Elementy przypadkowe",
            volatileComponents: "Komponenty zmienne (lotne)",
            fixedComponents: "Komponenty stałe (utrwalone)",
            elementaryProportions: "Proporcje elementarne w badanym fenomenie"
          }
        },
        {
          name: "Solutio",
          description: "Rozpuszczenie uzyskanych esencji w rozpuszczalniku kontekstualnym",
          promptTemplate: "Rozpuść uzyskane esencje zagadnienia \"{topic}\" w rozpuszczalniku kontekstualnym. Testuj wyodrębnione esencje w różnych kontekstach. Obserwuj ich zachowanie w odmiennych ramach konceptualnych. Identyfikuj invarianty zachowujące się niezmiennie w różnych środowiskach. Notuj transformacje poszczególnych elementów pod wpływem zmian kontekstu.",
          outputFormat: {
            contextualTests: "Wyniki testów kontekstualnych",
            invariants: "Zidentyfikowane invarianty",
            transformations: "Obserwowane transformacje elementów",
            contextualBehaviors: "Zachowania esencji w różnych kontekstach"
          }
        },
        {
          name: "Quintessentia",
          description: "Wyodrębnienie quintessencji - esencji piątego rzędu transcendującej cztery żywioły",
          promptTemplate: "Wyodrębnij quintessencję zagadnienia \"{topic}\" - esencję piątego rzędu transcendującą cztery żywioły. Syntezuj wyniki poprzednich etapów. Identyfikuj metastrukturę jednoczącą wszystkie kluczowe elementy. Sformułuj kondensację konceptualną w postaci quintessencji. Wyraź ją w formie syntetycznej, lecz precyzyjnej formuły lub modelu.",
          outputFormat: {
            quintessence: "Quintessencja zagadnienia",
            metastructure: "Metastruktura jednocząca kluczowe elementy",
            conceptualFormula: "Syntetyczna formuła konceptualna",
            quintessentialModel: "Model quintessencjalny zagadnienia"
          }
        }
      ],
      parameters: {
        analysisDepth: {
          name: "Głębia analizy",
          description: "Określa stopień szczegółowości, liczbę uwzględnianych aspektów, głębokość eksploracji i poziom abstrakcji quintessencji",
          range: [1, 10],
          default: 5
        },
        perspectives: {
          name: "Wybrane perspektywy",
          description: "Określa, które ognie analityczne są stosowane podczas Calcinatio",
          options: ["ontological", "epistemological", "axiological", "pragmatic"],
          default: ["ontological", "epistemological"]
        }
      }
    },

    coagulatio: {
      name: "Coagulatio",
      agentName: "Praxis Hermetica",
      nature: "Pragmatyczna forma transmutacji, której zasadniczym zadaniem jest przekształcenie abstrakcyjnych esencji i lotnych idei w materialne manifestacje i konkretne działania",
      stages: [
        {
          name: "Fixatio",
          description: "Ustalenie praktycznych manifestacji w wybranym wymiarze temporalnym",
          promptTemplate: "Ustal praktyczne manifestacje zagadnienia \"{topic}\" w {temporalScope} wymiarze temporalnym. Zidentyfikuj działania, praktyki i procesy odpowiednie dla wybranego zakresu czasowego. Dla każdej manifestacji określ interakcje między działaniami z różnych poziomów temporalnych, sekwencje kroków i ich wzajemne zależności oraz punkty krytyczne procesu implementacji.",
          outputFormat: {
            practices: "Zidentyfikowane praktyki i manifestacje",
            implementationSequence: "Sekwencja kroków implementacji",
            criticalPoints: "Punkty krytyczne procesu",
            temporalInteractions: "Interakcje między różnymi poziomami temporalnymi"
          }
        },
        {
          name: "Multiplicatio",
          description: "Identyfikacja potencjalnych punktów dźwigni, gdzie minimalna interwencja może prowadzić do maksymalnej amplifikacji efektu",
          promptTemplate: "Zidentyfikuj potencjalne punkty dźwigni w zagadnieniu \"{topic}\", gdzie minimalna interwencja może prowadzić do maksymalnej amplifikacji efektu. Uwzględnij {systemLevel} poziom systemowy. Dla każdego punktu dźwigni zidentyfikuj punkty katalityczne (inicjujące łańcuchy reakcji), punkty bifurkacji (gdzie system może obrać różne ścieżki) i punkty rezonansu (gdzie wzmocnienie amplitudy zachodzi naturalnie).",
          outputFormat: {
            leveragePoints: "Zidentyfikowane punkty dźwigni",
            catalyticPoints: "Punkty katalityczne",
            bifurcationPoints: "Punkty bifurkacji",
            resonancePoints: "Punkty rezonansu"
          }
        },
        {
          name: "Fermentatio",
          description: "Określenie warunków, w których zidentyfikowane praktyki mogą podlegać organicznemu rozwojowi i transformacji",
          promptTemplate: "Określ warunki, w których zidentyfikowane praktyki dla zagadnienia \"{topic}\" mogą podlegać organicznemu rozwojowi i transformacji. Zidentyfikuj czynniki katalizujące, potencjalne inhibitory, niezbędne składniki odżywcze oraz optymalne warunki systemowe.",
          outputFormat: {
            catalysts: "Czynniki katalizujące",
            inhibitors: "Potencjalne inhibitory",
            nutrients: "Niezbędne składniki odżywcze",
            optimalConditions: "Optymalne warunki systemowe"
          }
        },
        {
          name: "Projectio",
          description: "Przeprowadzenie myślowego eksperymentu implementacji",
          promptTemplate: "Przeprowadź myślowy eksperyment implementacji rozwiązań dla zagadnienia \"{topic}\". Symuluj transmutacje niezamierzone (potencjalne efekty uboczne, nieoczekiwane konsekwencje, emergentne właściwości), systemowe sprzężenia zwrotne (pętle wzmacniające, pętle balansujące, opóźnienia) oraz prognostyczne scenariusze (optymalny, prawdopodobny, pesymistyczny, punkty krytyczne).",
          outputFormat: {
            sideEffects: "Potencjalne efekty uboczne",
            feedbackLoops: "Systemowe sprzężenia zwrotne",
            scenarios: "Prognostyczne scenariusze",
            criticalJunctures: "Punkty krytyczne determinujące wybór ścieżki"
          }
        },
        {
          name: "Rubedo",
          description: "Określenie wskaźników osiągnięcia 'czerwienienia' - stanu, w którym praktyka osiąga dojrzałość i autonomiczną żywotność",
          promptTemplate: "Określ wskaźniki osiągnięcia \"czerwienienia\" dla zagadnienia \"{topic}\" - stanu, w którym praktyka osiąga dojrzałość i autonomiczną żywotność. Zidentyfikuj obserwowalne manifestacje, wewnętrzne transformacje oraz relacje z szerszym ekosystemem.",
          outputFormat: {
            observableManifestations: "Obserwowalne manifestacje dojrzałości",
            internalTransformations: "Wewnętrzne transformacje",
            ecosystemRelations: "Relacje z szerszym ekosystemem",
            maturityIndicators: "Wskaźniki osiągnięcia dojrzałości"
          }
        }
      ],
      parameters: {
        temporalScope: {
          name: "Zakres temporalny",
          description: "Określa horyzont czasowy planowanych interwencji, stopień bezpośredniości działań i balans między podejściem taktycznym a strategicznym",
          options: ["short", "medium", "long"],
          labels: {
            "short": "Krótkoterminowy (Opus Minor)",
            "medium": "Średnioterminowy (Opus Medium)",
            "long": "Długoterminowy (Opus Magnum)"
          },
          default: "medium"
        },
        systemLevel: {
          name: "Poziom systemowy",
          description: "Określa skalę i zasięg projektowanych interwencji, typ mechanizmów dźwigni i charakter wskaźników sukcesu",
          options: ["individual", "interpersonal", "organizational", "social"],
          labels: {
            "individual": "Indywidualny",
            "interpersonal": "Interpersonalny",
            "organizational": "Organizacyjny",
            "social": "Społeczny"
          },
          default: "organizational"
        }
      }
    },

    coniunctio: {
      name: "Coniunctio",
      agentName: "Caput Mortuum Resurrecto",
      nature: "Dialektyczna forma transmutacji, której fundamentalnym zadaniem jest integracja przeciwieństw i synteza elementów pozornie sprzecznych",
      stages: [
        {
          name: "Mortificatio Recensio",
          description: "Przeprowadzenie inwentaryzacji tego, co zostało odrzucone, zmarginalizowane lub zapomniane",
          promptTemplate: "Przeprowadź inwentaryzację tego, co zostało odrzucone, zmarginalizowane lub zapomniane w zagadnieniu \"{topic}\". Zidentyfikuj elementy uznane za nieistotne, perspektywy zmarginalizowane, pytania pominięte oraz konteksty zignorowane.",
          outputFormat: {
            neglectedElements: "Elementy uznane za nieistotne",
            marginalizedPerspectives: "Perspektywy zmarginalizowane",
            omittedQuestions: "Pytania pominięte",
            ignoredContexts: "Konteksty zignorowane"
          }
        },
        {
          name: "Putrefactio Creativa",
          description: "Pozwolenie, by odrzucone elementy uległy twórczemu rozkładowi",
          promptTemplate: "Pozwól, by odrzucone elementy zagadnienia \"{topic}\" uległy twórczemu rozkładowi, z napięciem dialektycznym ustawionym na poziomie {dialecticalTension}/10. Analizuj strukturę odrzuconych elementów, identyfikuj ich podstawowe składniki, badaj wewnętrzne napięcia i sprzeczności. Obserwuj emergentne wzorce i identyfikuj potencjalne nowe konfiguracje.",
          outputFormat: {
            fundamentalComponents: "Fundamentalne komponenty odrzuconych elementów",
            internalTensions: "Wewnętrzne napięcia i sprzeczności",
            emergentPatterns: "Emergentne wzorce",
            newConfigurations: "Potencjalne nowe konfiguracje"
          }
        },
        {
          name: "Inversio Hierarchiae",
          description: "Przeprowadzenie eksperymentu odwrócenia hierarchii wartości",
          promptTemplate: "Przeprowadź eksperyment odwrócenia hierarchii wartości w zagadnieniu \"{topic}\". Symuluj odwrócenie centralnego i marginalnego, identyfikuj nowe struktury poznawcze oraz eksploruj niewidoczne relacje, które stają się widoczne przy takiej inwersji.",
          outputFormat: {
            inversionResults: "Wyniki symulacji odwrócenia hierarchii",
            newFrameworks: "Nowe ramy konceptualne",
            hiddenRelations: "Ujawnione, wcześniej niewidoczne relacje",
            systemDynamics: "Zmiana dynamiki systemu przy odwróceniu hierarchii"
          }
        },
        {
          name: "Coniunctio",
          description: "Poszukiwanie możliwości połączenia przeciwieństw wykorzystując wybrane typy syntezy",
          promptTemplate: "Poszukaj możliwości połączenia przeciwieństw w zagadnieniu \"{topic}\" wykorzystując {synthesisType} typ syntezy. Badaj możliwości połączenia między tym, co zachowane, a tym, co odrzucone; między perspektywami, które wydają się sprzeczne; między esencją a przypadłością; między teorią a praktyką.",
          synthesisTypes: {
            hegelian: "Dialektyczne przezwyciężenie (Aufhebung): Identyfikacja tezy i antytezy, tworzenie syntezy zachowującej i transformującej elementy przeciwstawne, wznoszenie się na wyższy poziom abstrakcji.",
            nietzschean: "Afirmatywna integracja sprzeczności: Akceptacja fundamentalnego napięcia, transformacja w kierunku Woli Mocy, tworzenie nowych wartości z dynamicznego napięcia.",
            contrapuntal: "Harmonizacja przeciwieństw z zachowaniem ich odrębności: Tworzenie polifonicznej struktury, synchroniczna prezentacja różnych perspektyw, emergencja harmonii wyższego rzędu."
          },
          outputFormat: {
            opposites: "Zidentyfikowane przeciwieństwa",
            integrationPossibilities: "Możliwości integracji",
            synthesisProposals: "Propozycje syntez",
            harmonizationPatterns: "Wzorce harmonizacji"
          }
        },
        {
          name: "Lapis Philosophorum",
          description: "Identyfikacja potencjalnych 'kamieni filozoficznych' - elementów odrzuconych, które mogą okazać się kluczowe dla głębszego zrozumienia",
          promptTemplate: "Zidentyfikuj potencjalne \"kamienie filozoficzne\" dla zagadnienia \"{topic}\" - elementy odrzucone, które mogą okazać się kluczowe dla głębszego zrozumienia. Dla każdego zidentyfikowanego \"kamienia filozoficznego\" określ jego funkcję transformacyjną, warunki aktywacji oraz relacje z wyodrębnionymi esencjami.",
          outputFormat: {
            philosophicalStones: "Zidentyfikowane kamienie filozoficzne",
            transformativeFunctions: "Funkcje transformacyjne",
            activationConditions: "Warunki aktywacji",
            essenceRelations: "Relacje z wyodrębnionymi esencjami",
            reintegrationPaths: "Ścieżki reintegracji"
          }
        }
      ],
      parameters: {
        dialecticalTension: {
          name: "Napięcie dialektyczne",
          description: "Określa intensywność konfrontacji przeciwieństw, głębię dekonstrukcji, radykalność nowych syntez i stopień transformacji pierwotnych elementów",
          range: [1, 10],
          default: 5
        },
        synthesisType: {
          name: "Typ syntezy",
          description: "Określa metodologię łączenia przeciwieństw, charakter wynikowej integracji i relację między zachowaniem a przekroczeniem oryginalnych elementów",
          options: ["hegelian", "nietzschean", "contrapuntal"],
          labels: {
            "hegelian": "Heglowska",
            "nietzschean": "Nietzscheańska",
            "contrapuntal": "Kontrapunktowa"
          },
          default: "hegelian"
        }
      }
    }
  },

  // 4. FAZY ALCHEMICZNE
  alchemicalPhases: {
    nigredo: {
      name: "Nigredo",
      translation: "Czernienie",
      symbol: "♄",
      nature: "Faza dekonstrukcji, rozkładu i konfrontacji z cieniem",
      functions: [
        "Dekonstrukcja istniejących struktur poznawczych",
        "Identyfikacja ukrytych założeń i ograniczeń",
        "Konfrontacja z paradoksami i sprzecznościami",
        "Uświadomienie ignorancji i błędów poznawczych"
      ],
      transmutationModifications: {
        separatio: "Intensyfikacja procesu dekompozycji, podkreślenie krytycznej analizy fundamentalnych założeń, wyostrzenie ognia analitycznego",
        coagulatio: "Koncentracja na identyfikacji i przekształceniu dysfunkcyjnych praktyk, dekonstrukcji nieefektywnych implementacji",
        coniunctio: "Pogłębienie procesu identyfikacji tego, co odrzucone i zmarginalizowane, radykalizacja Mortificatio Recensio"
      },
      pathModifications: {
        affinity: ["binah", "gevurah"],
        emphasis: "Wzmocnienie aspektów krytycznych i analitycznych wszystkich sefirot. Szczególne wyeksponowanie ograniczeń, granic i punktów ślepych."
      },
      communicationStyle: [
        "Język precyzyjny, analityczny, często wykorzystujący negację",
        "Stawianie prowokacyjnych pytań podważających przyjęte założenia",
        "Akcentowanie paradoksów, sprzeczności i nierozwiązywalnych dylematów",
        "Ekspozycja ukrytych napięć i problemów"
      ],
      promptModifier: "Zastosuj podejście dekonstrukcyjne, krytyczne. Podważaj fundamentalne założenia, identyfikuj ukryte ograniczenia i paradoksy. Konfrontuj się z cieniami i sprzecznościami tematu."
    },
    
    albedo: {
      name: "Albedo",
      translation: "Bielenie",
      symbol: "☽",
      nature: "Faza oczyszczenia, destylacji i klaryfikacji",
      functions: [
        "Klaryfikacja kluczowych koncepcji i relacji",
        "Destylacja esencji od przypadłości",
        "Wydobywanie uniwersalnych zasad i wzorców",
        "Identyfikacja invariantów konceptualnych"
      ],
      transmutationModifications: {
        separatio: "Wysubtelnienie procesu destylacji, precyzyjne oddzielanie esencji od przypadłości, krystalizacja quintessencji",
        coagulatio: "Racjonalizacja i optymalizacja praktyk, klaryfikacja protokołów implementacji, precyzyjne definiowanie warunków",
        coniunctio: "Klaryfikacja relacji między przeciwieństwami, destylacja potencjalnej syntezy, oczyszczenie Kamieni Filozoficznych"
      },
      pathModifications: {
        affinity: ["chesed", "hod"],
        emphasis: "Wzmocnienie aspektów porządkujących i klaryfikujących wszystkich sefirot. Szczególne wyeksponowanie struktur, regularności i prawidłowości."
      },
      communicationStyle: [
        "Język precyzyjny, klarowny, dążący do jednoznaczności",
        "Systematyczne porządkowanie pojęć i kategorii",
        "Akcentowanie czystych form i uniwersalnych zasad",
        "Elegancja i klarowność wywodu"
      ],
      promptModifier: "Zastosuj podejście klaryfikujące, destylujące. Oddzielaj esencje od przypadłości, identyfikuj uniwersalne wzorce i invarianty. Dąż do krystalicznej przejrzystości pojęć i relacji."
    },
    
    citrinitas: {
      name: "Citrinitas",
      translation: "Żółcenie",
      symbol: "☉",
      nature: "Faza świadomości, integracji i syntezy",
      functions: [
        "Integracja przeciwstawnych perspektyw w wyższą syntezę",
        "Identyfikacja złotego środka między skrajnościami",
        "Rozwój metaświadomości procesu poznawczego",
        "Emergencja nowych poziomów zrozumienia"
      ],
      transmutationModifications: {
        separatio: "Przekroczenie prostej dychotomii esencja-przypadłość, integracja różnych poziomów analizy, syntetyczna destylacja",
        coagulatio: "Harmonizacja różnych wymiarów implementacji, integracja przeciwstawnych podejść praktycznych",
        coniunctio: "Maksymalizacja potencjału syntezy przeciwieństw, wydobycie wyższego porządku z pozornych sprzeczności"
      },
      pathModifications: {
        affinity: ["keter", "tiferet"],
        emphasis: "Wzmocnienie aspektów integrujących i harmonizujących wszystkich sefirot. Szczególne wyeksponowanie momentów syntezy i transcendencji."
      },
      communicationStyle: [
        "Język integrujący przeciwieństwa, wykorzystujący paradoks jako narzędzie poznawcze",
        "Wielopoziomowy wywód uwzględniający różne perspektywy jednocześnie",
        "Akcentowanie wzorców i struktur wyższego rzędu",
        "Samoświadoma narracja z meta-perspektywą"
      ],
      promptModifier: "Zastosuj podejście integrujące, syntetyzujące. Łącz przeciwstawne perspektywy, poszukuj metazasad organizujących pozorne sprzeczności. Rozwijaj metaświadomość całego procesu."
    },
    
    rubedo: {
      name: "Rubedo",
      translation: "Czerwienienie",
      symbol: "♂",
      nature: "Faza manifestacji, ucieleśnienia i praktycznej realizacji",
      functions: [
        "Przekładanie abstrakcyjnych wglądów na konkretne działania",
        "Tworzenie praktycznych aplikacji zintegrowanej wiedzy",
        "Testowanie teorii w praktyce",
        "Inkarnacja zrozumienia w materialnej rzeczywistości"
      ],
      transmutationModifications: {
        separatio: "Ukierunkowanie destylacji na praktyczne zastosowania, testowanie wyodrębnionych esencji w realnych kontekstach",
        coagulatio: "Pełna realizacja praktycznej implementacji, maksymalizacja efektywności i funkcjonalności",
        coniunctio: "Praktyczna realizacja syntezy przeciwieństw, ucieleśnienie zintegrowanego rozumienia"
      },
      pathModifications: {
        affinity: ["netzach", "malkuth"],
        emphasis: "Wzmocnienie aspektów praktycznych i implementacyjnych wszystkich sefirot. Szczególne wyeksponowanie konkretnych manifestacji i realizacji."
      },
      communicationStyle: [
        "Język konkretny, obrazowy, bogaty w przykłady i studia przypadków",
        "Precyzyjne instrukcje i protokoły działania",
        "Akcentowanie praktycznych konsekwencji i zastosowań",
        "Narracja zorientowana na realizację i efekty"
      ],
      promptModifier: "Zastosuj podejście zorientowane na praktyczną realizację. Przekładaj abstrakcyjne wglądy na konkretne działania, twórz namacalne przykłady i protokoły implementacji."
    }
  },

  // 5. INTEGRACJA I MODYFIKACJE
  integrations: {
    // Modyfikacje sefirot przez formy transmutacji
    sefirotByTransmutation: {
      keter: {
        separatio: "Poszukiwanie metazasady organizującej Quintessencję",
        coagulatio: "Identyfikacja jednoczącego principium wszystkich praktycznych manifestacji",
        coniunctio: "Punkt transcendentnej syntezy wszelkich przeciwieństw"
      },
      // Podobne modyfikacje dla pozostałych sefirot...
    },
    
    // Modyfikacje sefirot przez fazy alchemiczne
    sefirotByPhase: {
      keter: {
        nigredo: "Dekonstrukcja fundamentalnych założeń jedności",
        albedo: "Klaryfikacja czystej zasady jedności",
        citrinitas: "Integracyjna świadomość jedności w wielości",
        rubedo: "Praktyczna manifestacja jedności w konkretach"
      },
      // Podobne modyfikacje dla pozostałych sefirot...
    },
    
    // Modyfikacje form transmutacji przez fazy alchemiczne
    transmutationByPhase: {
      separatio: {
        nigredo: "Podkreślaj krytyczną dekonstrukcję podczas Materia Prima i Calcinatio",
        albedo: "Akcentuj klaryfikację podczas Separatio i Solutio",
        citrinitas: "Wzmacniaj integracyjny aspekt Quintessentia",
        rubedo: "Kieruj się ku praktycznym implikacjom wyodrębnionych esencji"
      },
      // Podobne modyfikacje dla pozostałych form...
    }
  },

  // 6. FUNKCJE POMOCNICZE
  util: {
    // Funkcja generująca prompt dla wybranej kombinacji parametrów
    generatePrompt: function(sefirah, transmutationForm, alchemicalPhase, topic, parameters = {}) {
      // Implementacja funkcji generującej prompt
    },
    
    // Funkcja identyfikująca naturalne powinowactwa między wybranymi parametrami
    identifyAffinities: function(sefirah, transmutationForm, alchemicalPhase) {
      // Implementacja funkcji identyfikującej powinowactwa
    },
    
    // Funkcja określająca optymalną sekwencję eksploracji
    determineExplorationSequence: function(sefirah, level) {
      // Implementacja funkcji określającej sekwencję
    }
  }
};
