# Copilot Instructions - Projeto SAS

## Visão Geral

**SAS** é um aplicativo React + Vite com Firebase que gerencia contatos de emergência e integra serviços Google Maps para localizar delegacias. Arquitetura: frontend Vite + Cloud Functions Node.js.

## Arquitetura & Data Flow

### Stack Principal
- **Frontend**: React 19 + Vite 7 + React Router 7
- **Styling**: Tailwind CSS (via CDN + browser plugin)
- **Backend**: Firebase (Auth + Firestore) + Cloud Functions (Node.js 22)
- **APIs Externas**: Google Maps Places API para buscar delegacias

### Fluxo de Autenticação
1. `AuthContext.jsx` wraps toda a app e usa `onAuthStateChanged` do Firebase
2. `PrivateRoute.jsx` protege `/home` e `/adicionar-contato` — redireciona para `/login` se `user` for null
3. Hooks customizados (`useLogin`, `useCadastro`) lidam com validações e Firebase calls

### Estrutura de Dados (Firestore)
```
usuarios/{uid}
  ├── usuario, telefone, email, criadoEm
  └── contatosEmergencia/{docId}
      ├── nome, telefone, criadoEm
```

### Cloud Functions
- **`encontrarDelegacias`**: Cloud Function HTTPS callável que recebe `(latitude, longitude)`, consulta Google Places API com raio de 15km e retorna delegacias da mulher próximas

## Padrões & Convenções

### Hooks Customizados (src/hooks/)
- `useContatos()` - CRUD de contatos com Firestore (fetchContatos, adicionarContato, editarContato, deletarContato)
- `useLogin()` - Estado de form + validação + Firebase signIn
- `useCadastro()` - Validação (email regex, 11 dígitos tel, 6+ chars senha) + createUserWithEmailAndPassword + setDoc
- `useHomePage()` - Orquestra contatos + modal state + ações de edição/deleção
- **Padrão**: Retornam estado + handlers, chamam Firebase direto (sem service layer)

### Componentes & Hierarquia
- `MainLayout.jsx` - Wrapper com header fixo, conteúdo flex-grow, bottom nav fixo
- `HomeFloatingButtons.jsx` - Menu flutuante com ações principais
- `AdicionarContatoModal.jsx` - Modal reutilizável para criar/editar contatos
- **Padrão**: Props-based; estado de modais vive em hooks ou contexto pai

### Validações
- Email: regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Telefone: exatamente 11 dígitos `/^\d{11}$/`
- Senha: mínimo 6 caracteres
- Username: mínimo 3 caracteres

### Estilos & Design
- Gradientes roxos: `#9576F7` → `#8160E5` (header, nav buttons)
- Tailwind classes com Material Symbols Outlined icons
- Espaçamento: `px-4 py-6` padrão para paddings de seção
- Responsive: mobile-first, usa `flex`, `flex-col`, `flex-1`

## Build & Deploy

### Frontend (Root)
```powershell
npm run dev      # Vite dev server
npm run build    # Build otimizado
npm run lint     # ESLint
npm run preview  # Preview build local
```

### Cloud Functions (functions/)
```powershell
npm run serve    # Emuladores Firebase localmente
npm run deploy   # Deploy via `firebase deploy --only functions`
npm run logs     # Ver logs da function
```

### Deploy Completo
- Firebase hosting + functions configurados em `firebase.json`
- Região: `southamerica-east1` para Cloud Functions
- Env vars: `.env.local` (Firebase admin - opcional)

## Integração Mapa de Delegacias (Novo!)

### Stack
- **Frontend**: Leaflet + React-Leaflet (mapa open-source)
- **Backend**: Cloud Function com Overpass API (OpenStreetMap)
- **Geolocalização**: Browser Geolocation API
- **Rota**: `/mapa-delegacias` (protegida por PrivateRoute)

### Fluxo
1. Usuário clica botão 🗺️ em `HomeFloatingButtons.jsx`
2. `MapaDelegacias.jsx` renderiza
3. Hook `useMapaDelegacias` solicita geolocalização
4. Cloud Function `encontrarDelegacias` busca delegacias via Overpass
5. Leaflet renderiza mapa com markers (azul=você, vermelho=delegacias)

### Arquivos Principais
- `src/pages/MapaDelegacias.jsx` - UI do mapa
- `src/hooks/useMapaDelegacias.js` - Lógica e estado
- `functions/index.js` - Cloud Function (Overpass API)

## Fluxos Críticos

### Adicionar/Editar Contato
1. `HomeFloatingButtons` dispara `abrirModalNovo` ou `abrirModalEditar`
2. `AdicionarContatoModal` recebe `contatoExistente` e popula form
3. Submit chama `salvarContato` do `useHomePage` → `addDoc` ou `updateDoc`
4. Modal fecha, `fetchContatos` refetch lista

### Autenticação & Redirecionamento
1. `SplashScreen` → `useAuth` check
2. Se autenticado → redirect `/home`
3. Se não → `/login` ou `/cadastro`
4. Após login → `navigate("/home")`

## Pontos de Atenção

- **Sem TypeScript**: Projeto usa JS puro — type safety via JSDoc é recomendado
- **ESLint rules**: `react-refresh/only-export-components` (não exportar contextos/utils como default)
- **Firebase Security**: API key exposta no código — em produção, usar Firestore rules + Cloud Functions
- **Async/await**: Sem error boundaries — console.error em fallback; melhorar com try-catch e feedback UI
- **Tailwind via CDN**: Não é otimizado para produção — considerar build process se cresce
- **Cloud Functions timeout**: Google Maps pode ser lento; adicionar retry logic se necessário

## Exemplos Rápidos

**Novo Hook com Firestore**:
```javascript
export function useMyFeature() {
  const [data, setData] = useState([]);
  
  const fetch = useCallback(async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;
      
      const snapshot = await getDocs(collection(db, "usuarios", user.uid, "myFeature"));
      setData(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error("Erro:", err);
    }
  }, []);
  
  useEffect(() => { fetch(); }, [fetch]);
  
  return { data, refetch: fetch };
}
```

**Novo Componente Protegido**:
```jsx
<Route path="/feature" element={<PrivateRoute><Feature /></PrivateRoute>} />
```

**Chamar Cloud Function**:
```javascript
import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase/firebase";

const encontrar = httpsCallable(functions, "encontrarDelegacias");
await encontrar({ latitude, longitude });
```

---

**Última atualização**: Novembro 2025 | Branch: `feature-fornecer-mapa`
