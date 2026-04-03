// ========================================
// QUEST CARDS APP
// ========================================

class QuestCards {
    constructor() {
        // State
        this.allCards = [];
        this.currentHabitat = 'all';
        this.cardPool = [];
        this.usedCards = [];
        this.currentCard = null;
        this.isFlipped = false;

        // DOM elements
        this.card = document.querySelector('.card');
        this.cardTitle = document.querySelector('.card-title');
        this.cardBody = document.querySelector('.card-body');
        this.cardLocation = document.querySelector('.card-location');
        this.habitatIcon = document.querySelector('.habitat-icon');
        this.habitatButtons = document.querySelectorAll('.habitat-btn');

        // Initialize
        this.init();
    }

    async init() {
        await this.loadCards();
        this.setupEventListeners();
        this.loadStateFromURL();
        this.updateTheme();
    }

    // ========================================
    // DATA LOADING
    // ========================================

    async loadCards() {
        try {
            const response = await fetch('data/quest-cards.json');
            if (!response.ok) {
                throw new Error(`Failed to load cards: ${response.status}`);
            }
            this.allCards = await response.json();

            // Add unique index to each card for URL sharing
            this.allCards.forEach((card, index) => {
                card.id = index;
            });

            this.resetCardPool();
        } catch (error) {
            console.error('Error loading cards:', error);
            // Show user-friendly error
            this.cardTitle.textContent = 'Oops!';
            this.cardBody.textContent = 'Could not load quest cards. Please check that quest-cards.json is in the data folder.';
            this.card.classList.add('flipped');
        }
    }

    // ========================================
    // CARD POOL MANAGEMENT
    // ========================================

    resetCardPool() {
        // Filter cards by current habitat
        const filteredCards = this.currentHabitat === 'all'
            ? [...this.allCards]
            : this.allCards.filter(card => card.habitat === this.currentHabitat);

        // Shuffle and reset pool
        this.cardPool = this.shuffle([...filteredCards]);
        this.usedCards = [];
    }

    shuffle(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    drawCard() {
        // If pool is empty, reshuffle
        if (this.cardPool.length === 0) {
            this.resetCardPool();
        }

        // Draw next card from pool
        this.currentCard = this.cardPool.pop();
        this.usedCards.push(this.currentCard);

        return this.currentCard;
    }

    // ========================================
    // CARD DISPLAY
    // ========================================

    revealCard(specificCard = null) {
        const card = specificCard || this.drawCard();

        // Update card content
        this.cardTitle.textContent = card.title;
        this.cardBody.textContent = card.body;
        this.cardLocation.textContent = card.habitat;
        this.updateHabitatIcon(card.habitat);

        // Add habitat data attribute to card for individual theming
        this.card.setAttribute('data-card-habitat', card.habitat);

        // Flip card
        this.card.classList.add('flipped');
        this.isFlipped = true;

        // Update theme: only change page theme if specific habitat is selected
        // If "all" is selected, only the card itself changes color
        if (this.currentHabitat !== 'all') {
            this.updateTheme(card.habitat);
        }

        // Update URL with current card
        this.updateURL(card.id);

        // Update aria-label
        this.card.setAttribute('aria-label', `Quest card: ${card.title} - Click for next card`);
    }

    resetCard() {
        // Flip back to card back
        this.card.classList.remove('flipped');
        this.isFlipped = false;

        // Update aria-label
        this.card.setAttribute('aria-label', 'Quest card - Click to reveal');

        // After flip animation completes, reveal next card
        setTimeout(() => {
            this.revealCard();
        }, 600); // Match flip-speed from CSS
    }

    updateHabitatIcon(habitat) {
        const icons = {
            beach: `
                <path d="M16 20 Q16 14 10 12 Q16 10 16 4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <path d="M16 20 Q16 14 22 12 Q16 10 16 4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <circle cx="16" cy="26" r="1.5" fill="currentColor"/>
                <circle cx="20" cy="27" r="1" fill="currentColor"/>
                <circle cx="12" cy="27" r="1" fill="currentColor"/>
            `,
            forest: `
                <path d="M16 6 L20 14 L18 14 L22 22 L10 22 L14 14 L12 14 Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                <line x1="16" y1="22" x2="16" y2="28" stroke="currentColor" stroke-width="2"/>
            `,
            park: `
                <circle cx="16" cy="10" r="6" fill="none" stroke="currentColor" stroke-width="2"/>
                <line x1="16" y1="16" x2="16" y2="28" stroke="currentColor" stroke-width="2"/>
                <path d="M10 20 Q10 18 16 18 Q22 18 22 20" fill="none" stroke="currentColor" stroke-width="2"/>
            `,
            all: `
                <circle cx="16" cy="16" r="10" fill="none" stroke="currentColor" stroke-width="2"/>
                <path d="M16 6 L16 26 M6 16 L26 16" stroke="currentColor" stroke-width="2"/>
            `
        };

        this.habitatIcon.innerHTML = icons[habitat] || icons.all;
    }

    // ========================================
    // THEME MANAGEMENT
    // ========================================

    updateTheme(habitat = this.currentHabitat) {
        // Remove all theme classes
        document.body.classList.remove('theme-beach', 'theme-forest', 'theme-park');

        // Add new theme class if not 'all'
        if (habitat !== 'all') {
            document.body.classList.add(`theme-${habitat}`);
        }
    }

    // ========================================
    // HABITAT SELECTION
    // ========================================

    selectHabitat(habitat) {
        this.currentHabitat = habitat;

        // Update button states
        this.habitatButtons.forEach(btn => {
            const isActive = btn.dataset.habitat === habitat;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', isActive);
        });

        // Reset card pool for new habitat
        this.resetCardPool();

        // Update theme
        this.updateTheme();

        // Update URL
        this.updateURL();

        // Reset card to back if currently flipped
        if (this.isFlipped) {
            this.card.classList.remove('flipped');
            this.isFlipped = false;
        }

        // Clear card habitat attribute
        this.card.removeAttribute('data-card-habitat');
    }

    // ========================================
    // URL STATE MANAGEMENT
    // ========================================

    updateURL(cardId = null) {
        const url = new URL(window.location);

        // Update habitat parameter
        if (this.currentHabitat === 'all') {
            url.searchParams.delete('habitat');
        } else {
            url.searchParams.set('habitat', this.currentHabitat);
        }

        // Update card parameter
        if (cardId !== null) {
            url.searchParams.set('card', cardId);
        } else {
            url.searchParams.delete('card');
        }

        window.history.replaceState({}, '', url);
    }

    loadStateFromURL() {
        const url = new URL(window.location);
        const habitat = url.searchParams.get('habitat');
        const cardId = url.searchParams.get('card');

        // Set habitat first
        if (habitat && ['beach', 'forest', 'park'].includes(habitat)) {
            this.selectHabitat(habitat);
        }

        // If a specific card is requested, show it
        if (cardId !== null) {
            const cardIndex = parseInt(cardId, 10);
            const card = this.allCards[cardIndex];

            if (card) {
                // Show the specific card directly
                this.revealCard(card);
            }
        }
    }

    // ========================================
    // EVENT LISTENERS
    // ========================================

    setupEventListeners() {
        // Card click/tap
        this.card.addEventListener('click', () => this.handleCardClick());

        // Keyboard support for card
        this.card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.handleCardClick();
            }
        });

        // Habitat button clicks
        this.habitatButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.selectHabitat(btn.dataset.habitat);
            });
        });

        // Handle browser back/forward
        window.addEventListener('popstate', () => {
            this.loadStateFromURL();
        });
    }

    handleCardClick() {
        if (!this.isFlipped) {
            // First click: reveal card
            this.revealCard();
        } else {
            // Subsequent clicks: next card
            this.resetCard();
        }
    }
}

// ========================================
// INITIALIZE APP
// ========================================

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new QuestCards());
} else {
    new QuestCards();
}
