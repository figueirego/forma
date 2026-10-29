# Forma 1.26.2

Plugin comunitário de design para Codex, distribuído sob a licença MIT: uma coordenadora e 11 especialistas. Não exige servidor, chave de API, hooks ou autenticação própria. O uso do Codex continua sujeito ao plano do usuário. Integrações externas são opcionais e só podem ser usadas quando disponíveis e autorizadas.

Selecione **Forma** no catálogo de plugins ou invoque `$forma:forma`. Exemplo: “Use Forma para refinar a sidebar, os botões e as cores deste projeto, preservando sua identidade.” Para uma tarefa específica, selecione Forma Interface, Forma Motion ou outra especialista.

A coordenadora está em [skills/forma/SKILL.md](skills/forma/SKILL.md). A raiz compartilhada contém `references/`, `assets/`, `scripts/`, `tests/` e `evals/`. Caminhos `<forma-root>` nos exemplos apontam para essa raiz, inclusive quando a skill estiver no cache instalado.

O pacote preserva os recursos executáveis da Forma 1.26.2; `provenance.json` registra os arquivos originais e empacotados. O editor completo de aparência tem contratos, não um componente pronto. O BookObject tem implementação reutilizável e dependências documentadas. Este plugin não instala ECC, REA, Figma ou o runtime do Design Agent.

Geração: editar `source/forma/` no [repositório público](https://github.com/figueirego/forma), executar `npm run build` e depois `npm run check`. Esta pasta é gerada; não editar uma segunda cópia dos princípios aqui. Instalação por marketplace copia um snapshot; mudanças posteriores na fonte exigem empacotar e atualizar o plugin. A skill avulsa é uma distribuição independente.

Verificações locais: `python3 scripts/check_package.py --root .` e `python3 -m unittest discover -s tests -p 'test_*.py' -v` na raiz do plugin. O [catálogo](catalog.json) é derivado da fonte; o verificador confere os arquivos reais. Aprovação desses utilitários não comprova design ou integração de um produto. Veja [operação e limites](references/plugin-operation.md).

Identidade visual: [apresentação](assets/plugin-brand/identidade.html), [guia](assets/plugin-brand/README.md) e arquivos SVG/PNG. A marca da Forma pertence ao plugin, não é um tema obrigatório para os seus projetos. O hero é uma imagem gerada, não um componente 3D interativo.
