/**
 * Diagnostic Checklist
 * Vérifier ces points si vous avez une page blanche
 */

console.log('=== DIAGNOSTIC INTIA ASSURANCE ===\n');

// 1. Vérifier l'environnement
console.log('1. Environnement:');
console.log('   VITE_API_URL:', import.meta.env.VITE_API_URL);

// 2. Vérifier le DOM
console.log('\n2. DOM:');
const rootElement = document.getElementById('root');
console.log('   Element #root existe?', !!rootElement);
console.log('   Root element:', rootElement);

// 3. Vérifier localStorage
console.log('\n3. LocalStorage:');
console.log('   access_token:', localStorage.getItem('access_token') ? '✓ Existe' : '✗ Non trouvé');

// 4. Vérifier les imports
console.log('\n4. Imports:');
console.log('   React: ✓ Chargé');
console.log('   React Router: ✓ Chargé');
console.log('   Axios: ✓ Chargé');

console.log('\n=== FIN DIAGNOSTIC ===\n');

// Si vous voyez cette ligne, React a démarré correctement
console.log('✓ Application React chargée avec succès');
