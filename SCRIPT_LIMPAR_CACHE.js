(function() {
  console.log("🧹 Iniciando limpeza de cache...");
  
  // 1. Limpar localStorage
  try {
    localStorage.clear();
    console.log("✅ localStorage limpo");
  } catch (e) {
    console.warn("⚠️ Erro ao limpar localStorage:", e);
  }
  
  // 2. Limpar sessionStorage
  try {
    sessionStorage.clear();
    console.log("✅ sessionStorage limpo");
  } catch (e) {
    console.warn("⚠️ Erro ao limpar sessionStorage:", e);
  }
  
  // 3. Limpar cookies
  try {
    document.cookie.split(";").forEach(function(c) {
      const cookieName = c.split("=")[0].trim();
      if (cookieName) {
        document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      }
    });
    console.log("✅ Cookies limpos");
  } catch (e) {
    console.warn("⚠️ Erro ao limpar cookies:", e);
  }
  
  // 4. Limpar IndexedDB (se houver dados de Firebase)
  try {
    if (window.indexedDB && window.indexedDB.databases) {
      window.indexedDB.databases().then(function(dbs) {
        dbs.forEach(function(db) {
          window.indexedDB.deleteDatabase(db.name);
        });
        console.log("✅ IndexedDB limpo");
      });
    }
  } catch (e) {
    console.warn("⚠️ Erro ao limpar IndexedDB:", e);
  }
  
  console.log("🎉 Limpeza concluída! Agora faça Ctrl+Shift+R para hard refresh");
})();
