# Forma 1.23.0 para Claude Code

Uma coordenadora e 11 especialistas. Use `/forma:forma` ou `/forma:forma-interface`.
O marketplace comunitário está na raiz do repositório: `claude plugin marketplace add figueirego/forma`, depois `claude plugin install forma@forma-community`.
Para experimentar este checkout: `claude --plugin-dir ./plugins/forma-claude` a partir da raiz do repositório.

[Coordenadora](skills/forma/SKILL.md), [catálogo](catalog.json) e [operação](references/plugin-operation.md).
Os arquivos de apresentação `agents/openai.yaml` são preservados para procedência; Claude Code não depende deles.
Não instala ECC, REA, ferramentas de navegador, modelos, serviços ou hooks. Confira recursos e permissões do seu host.
O editor de aparência é um contrato de implementação, não um componente automaticamente instalado em produtos.

Gerado por `npm run build` a partir de `source/forma/`. Não editar esta cópia.
[MIT](LICENSE) e [avisos de terceiros](THIRD_PARTY_NOTICES.md).
