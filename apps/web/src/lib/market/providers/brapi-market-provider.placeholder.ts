/**
 * BrapiMarketProvider — PLACEHOLDER (não implementado)
 *
 * Este arquivo documenta o contrato esperado para integrar a API BrAPI (https://brapi.dev)
 * como provider de dados de mercado. NÃO instanciar nem importar em produção ainda.
 *
 * Para ativar:
 * 1. Implementar as funções abaixo
 * 2. Definir BRAPI_TOKEN em .env.local (nunca commitar o token)
 * 3. Em market-provider.ts, substituir MockMarketProvider por BrapiMarketProvider
 *    (ou implementar seleção por variável de ambiente)
 *
 * Riscos conhecidos:
 * - Rate limit: plano gratuito limita chamadas por minuto/dia
 * - Dados podem ter atraso de 15–20 minutos (mercado B3 e NYSE)
 * - Cotações de moedas e ações em exchanges diferentes podem ter formato distinto
 * - Sem histórico de ações BR no plano gratuito
 * - Sempre manter MockMarketProvider como fallback para dev/staging
 */

// TODO: instalar dependência quando pronto (ex: fetch nativo ou axios)
// TODO: criar env var NEXT_PUBLIC_BRAPI_TOKEN ou BRAPI_TOKEN (server-only)
// TODO: implementar cache simples (Map com TTL de 60s) para evitar rate limit
// TODO: mapear campos da BrAPI para o formato Asset do @study-helper/types
// TODO: tratar erros de rede, timeout e respostas 4xx/5xx

/*
Formato esperado da BrAPI para cotação de ação:
GET https://brapi.dev/api/quote/PETR4?token=TOKEN

{
  "results": [{
    "symbol": "PETR4",
    "shortName": "PETROBRAS   PN      N2",
    "regularMarketPrice": 38.42,
    "regularMarketChangePercent": 2.15,
    "currency": "BRL",
    "updatedAt": "2026-05-21T18:00:00.000Z"
  }]
}

Campos obrigatórios para construir Asset:
- symbol → asset.symbol
- shortName → asset.name
- regularMarketPrice → asset.price
- regularMarketChangePercent → asset.changePercent
- currency → asset.currency
- updatedAt → asset.lastUpdated

Campos que a BrAPI NÃO retorna (manter mock ou derivar):
- asset.id (derivar do symbol em lowercase)
- asset.description (manter string fixa por ativo)
- asset.educationalSummary (manter string fixa por ativo)
- asset.riskLevel (manter configuração fixa por ativo)
- asset.visualTheme (manter configuração fixa por ativo)
- asset.history (chamar endpoint separado ou manter mock)
- asset.trend (derivar com getTrendState(changePercent))
- asset.isMock (sempre false para provider real)
*/

// Exemplo de implementação futura:
//
// import type { MarketDataProvider, MarketDataProviderResult, AssetQuote } from '@/types/market-provider';
//
// export const BrapiMarketProvider: MarketDataProvider = {
//   name: 'brapi',
//
//   getAssets() {
//     // TODO: chamar getQuote para todos os símbolos conhecidos e montar Asset[]
//     throw new Error('BrapiMarketProvider.getAssets() não implementado');
//   },
//
//   getAssetById(id: string) {
//     // TODO: chamar getQuote(symbol) e retornar Asset ou undefined
//     throw new Error('BrapiMarketProvider.getAssetById() não implementado');
//   },
//
//   getQuote(symbol: string): MarketDataProviderResult<AssetQuote> {
//     // TODO: fetch `https://brapi.dev/api/quote/${symbol}?token=${token}`
//     throw new Error('BrapiMarketProvider.getQuote() não implementado');
//   },
//
//   getHistory(symbol, period) {
//     // TODO: fetch histórico via brapi.dev/api/quote/${symbol}?range=1mo&interval=1d
//     throw new Error('BrapiMarketProvider.getHistory() não implementado');
//   },
//
//   getProviderStatus() {
//     return 'offline'; // mudar para 'online' após health check real
//   },
// };
export {};
