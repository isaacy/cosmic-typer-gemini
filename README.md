# Cosmic Typer 🚀

A space-themed typing adventure game designed to teach touch typing to elementary school children.

## User Experience (How to Play)

### 1. Academy Mode (Learn)
Start here if you are a new cadet!
-   **Goal**: Learn the keyboard layout and correct fingering.
-   **Gameplay**:
    -   Follow the text on screen.
    -   **Look at the Virtual Hands**: They show you exactly which finger to use for each key.
    -   **Virtual Keyboard**: Highlights the key you need to find.
-   **Progression**:
    -   Pass lessons to unlock your **Typing License**.
    -   Unlocking a license (e.g., "Home Row") allows those keys to appear in Survival Mode.

### 2. Survival Mode (Play)
Test your skills in the asteroid field!
-   **Goal**: Defend your ship from falling asteroids.
-   **Gameplay**:
    -   Asteroids with words will fall from space.
    -   Type the word correctly to destroy the asteroid.
    -   Don't let them hit your ship!
-   **Difficulty**:
    -   The game **only uses keys you have learned** in the Academy.
    -   As you survive longer, the asteroids fall faster.

## Setup & Development

### Installation
```bash
npm install
```

### Run Locally
```bash
npm run dev
```

### Testing
```bash
npm test
```

## Structure
-   **Engine**: Custom React hooks (`useTypingEngine`) handle keystroke validation and WPM calculation.
-   **State**: `Zustand` manages global progression (Lives, Score, Licenses).
-   **Visuals**: Custom CSS properties allow for easy theming and high-contrast accessibility updates.

## Deployment

This project is configured for deployment to **GitHub Pages**.

1.  **Build the project**:
    ```bash
    npm run build
    ```
2.  **Deploy**:
    ```bash
    npm run deploy
    ```
    This command will push the `dist` folder to a `gh-pages` branch on your repository.

To enable GitHub Pages:
1.  Go to your GitHub repository settings.
2.  Navigate to **Pages**.
3.  Set the **Source** to `gh-pages` branch.
