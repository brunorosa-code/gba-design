# GBA Design - Protótipo Global Bank Account

Este repositório contém o protótipo React Native do Global Bank Account, organizado para permitir que o time de design trabalhe colaborativamente em diferentes domínios e países.

## Estrutura de Branches

```
main                    ← Protótipo principal (sempre funcionando)
│
├── GBA-Dashboard       ← Tela principal com entry-points
├── Money-In            ← Fluxos de depósito
│   ├── CICO
│   └── Deposit-Area
├── Transfer-Out        ← Fluxos de transferência
├── Payment-Assistant   ← Assistente de pagamento
├── Money-Boxes         ← Cofrinhos/Alcancías
└── Content             ← Edição de conteúdo/textos
```

## Países Suportados

- 🇧🇷 Brasil (português)
- 🇲🇽 México (espanhol)
- 🇨🇴 Colômbia (espanhol)
- 🇺🇸 Estados Unidos (inglês)

---

## Guia Rápido para Designers

### Comandos do dia a dia

| O que você quer fazer | Comando |
|-----------------------|---------|
| Ver em qual branch está | `git branch` |
| Baixar atualizações | `git pull` |
| Trocar de branch | `git checkout nome-da-branch` |
| Salvar suas alterações | `git add . && git commit -m "descrição"` |
| Enviar para o GitHub | `git push` |

### Passo a passo: Começar a trabalhar

```bash
# 1. Abra o terminal no Cursor

# 2. Vá para sua branch de trabalho
git checkout Money-In    # ou outra branch

# 3. Baixe as últimas atualizações
git pull

# 4. Agora você pode trabalhar normalmente
```

### Passo a passo: Salvar e enviar suas alterações

```bash
# 1. Veja o que você alterou
git status

# 2. Salve suas alterações (commit)
git add .
git commit -m "Adicionei tela de depósito PIX para Brasil"

# 3. Envie para o GitHub
git push
```

### Passo a passo: Criar um Pull Request

1. Após fazer `git push`, vá para o GitHub
2. Clique em **"Pull Requests"** → **"New Pull Request"**
3. Selecione:
   - **base:** branch destino (ex: `Money-In` ou `main`)
   - **compare:** sua branch (ex: `CICO`)
4. Adicione um título e descrição
5. Clique em **"Create Pull Request"**
6. O owner vai revisar e aprovar

---

## Estrutura do Código

```
MoneyIn/
├── App.js                     ← Arquivo principal
├── src/
│   ├── components/            ← Componentes reutilizáveis
│   │   └── CountrySelector.js ← Seletor de país
│   ├── contexts/
│   │   └── CountryContext.js  ← Gerencia país selecionado
│   ├── hooks/
│   │   └── useTranslation.js  ← Hook para traduções
│   ├── i18n/
│   │   └── translations.js    ← Textos em todos os idiomas
│   └── screens/               ← Telas do app
│       └── HomeScreen.js
```

## Como funciona o sistema de países

### Mesma tela, idiomas diferentes

Os textos ficam no arquivo `src/i18n/translations.js`. Para usar:

```javascript
import { useTranslation } from '../hooks/useTranslation';

function MinhaTela() {
  const { t } = useTranslation();
  
  return <Text>{t('dashboard.title')}</Text>;
  // Mostra "Minha Conta Global" no Brasil
  // Mostra "Mi Cuenta Global" no México
}
```

### Telas diferentes por país

Você pode verificar qual país está selecionado:

```javascript
import { useCountry } from '../contexts/CountryContext';

function MinhaTela() {
  const { currentCountry } = useCountry();
  
  if (currentCountry.code === 'brasil') {
    return <TelaPix />;
  } else if (currentCountry.code === 'mexico') {
    return <TelaSPEI />;
  }
}
```

---

## Rodando o Protótipo

```bash
# Entrar na pasta do projeto
cd MoneyIn

# Instalar dependências (só na primeira vez)
npm install

# Rodar no navegador
npm run web

# Rodar no iOS (precisa de Mac)
npm run ios

# Rodar no Android
npm run android
```

---

## Configurar Proteção da Branch Main (Admin)

Para exigir Pull Requests antes de fazer merge na main:

1. Vá para o repositório no GitHub
2. Clique em **Settings** → **Branches**
3. Clique em **Add rule**
4. Em "Branch name pattern", digite: `main`
5. Marque:
   - ☑️ Require a pull request before merging
   - ☑️ Require approvals (1 approval)
6. Clique em **Create**

---

## Owners dos Domínios

| Domínio | Owner | Branch |
|---------|-------|--------|
| GBA Dashboard | [Nome] | `GBA-Dashboard` |
| Money In | [Nome] | `Money-In` |
| Transfer Out | [Nome] | `Transfer-Out` |
| Payment Assistant | [Nome] | `Payment-Assistant` |
| Money Boxes | [Nome] | `Money-Boxes` |
| Content | [Nome] | `Content` |

---

## Dúvidas Frequentes

### Minha branch vai ser excluída se eu fizer merge?

Não! A branch só é excluída se você marcar a opção "Delete branch" no GitHub. Por padrão, ela continua existindo.

### Dois designers podem trabalhar na mesma branch?

Sim! Mas combinem quem mexe em qual arquivo para evitar conflitos. Sempre faça `git pull` antes de começar a trabalhar.

### Como voltar uma alteração que fiz errado?

```bash
# Ver histórico de commits
git log --oneline

# Voltar para um commit específico (cuidado!)
git checkout [hash-do-commit] -- arquivo.js
```

### O que fazer se der conflito?

1. Não entre em pânico!
2. Abra o arquivo com conflito
3. Procure por `<<<<<<<` e `>>>>>>>`
4. Escolha qual versão manter (ou combine as duas)
5. Remova as marcações de conflito
6. Faça commit normalmente

---

## Suporte

Se tiver dúvidas, fale com o Design Lead ou Tech Lead do time.
