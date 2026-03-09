# Weather App 🌤️

Aplicação web para consultar a temperatura e condições climáticas de qualquer lugar do mundo usando as APIs da Open Meteo.

## 🚀 Funcionalidades

- **Busca inteligente de locais**: Digite o nome de qualquer cidade, estado ou país
- **Geocodificação automática**: Sistema busca automaticamente latitude, longitude e elevação
- **Dados climáticos em tempo real**: Temperatura, umidade, velocidade do vento e precipitação
- **Interface intuitiva**: Autocomplete com sugestões de lugares
- **Sem necessidade de API key**: Todas as APIs são gratuitas e públicas

## 🛠️ Tecnologias Utilizadas

- **React 18** + **TypeScript**
- **Vite** - Build tool
- **Open Meteo API** - Dados climáticos
- **Open Meteo Geocoding API** - Conversão de nomes de lugares para coordenadas

## 📦 APIs Utilizadas

### 1. Open Meteo Geocoding API

- **Endpoint**: `https://geocoding-api.open-meteo.com/v1/search`
- **Função**: Converte nomes de lugares em coordenadas (latitude, longitude, elevação)
- **Suporte**: Múltiplos idiomas, incluindo português

### 2. Open Meteo Weather API

- **Endpoint**: `https://api.open-meteo.com/v1/forecast`
- **Função**: Fornece dados climáticos em tempo real
- **Dados disponíveis**: Temperatura, umidade, velocidade do vento, código do clima

## 🏃 Como Executar

```bash
# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm run dev

# Build para produção
npm run build
```

## 📂 Estrutura do Projeto

```
src/
├── components/
│   └── LookWeatherByPlace.tsx    # Componente principal de busca e exibição
├── services/
│   └── geocodingService.ts       # Serviço de geocodificação
├── types/
│   └── geocoding.ts              # Tipos TypeScript
├── pages/
│   └── SearchForAPlace.tsx       # Página de busca
└── App.tsx                        # Componente raiz
```

## 💡 Como Funciona

1. **Usuário digita o nome do lugar** (ex: "São Paulo")
2. **Sistema busca automaticamente** na API de Geocoding
3. **Resultados são exibidos** com informações detalhadas (cidade, estado, país)
4. **Ao selecionar um lugar**, o sistema:
   - Obtém latitude, longitude e elevação automaticamente
   - Busca os dados climáticos atuais na Weather API
   - Exibe temperatura, umidade e velocidade do vento

## 🌍 Exemplo de Uso

```typescript
// Buscar um lugar
const results = await searchPlaces("Rio de Janeiro");

// Resultado inclui:
// - latitude e longitude
// - elevação
// - timezone
// - nome completo (cidade, estado, país)
// - população (quando disponível)
```

## 📝 Licença

Projeto desenvolvido para fins educacionais.
