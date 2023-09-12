# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


Commandes d'installation + plugin

```bash
npm create vite@latest
cd <project_name>
npm install
npm run dev
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

ajouter dans le fichier tailwind.config.js :

```js
/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      
    },
    plugins: [],
  }
}
```

ajouter dans le fichier index.css :

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Ajouter le router 

    npm install react-router-dom


Ajouter fontAwesome 

    npm install --save @fortawesome/fontawesome-svg-core
    npm install --save @fortawesome/free-solid-svg-icons
    npm install --save @fortawesome/react-fontawesome


Ajouter la pagination
    
    npm install rc-pagination


Ajouter lodash pour la session storage

    npm i --save lodash


Ajouter axios 
  
    npm install axios

Gestion des formulaires

    npm install react-hook-form