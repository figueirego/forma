# Procedência e referências externas

A Forma contém documentação, componentes e verificadores originais. A pesquisa de princípios e o histórico estão em [sources.md](references/sources.md). Citar uma referência não concede licença sobre seu código ou seus assets e não implica endosso.

## ECC

A organização por skills, leitura progressiva, evidências e validação foi informada pelo [ECC](https://github.com/affaan-m/ECC). A Forma não incorpora o runtime, os hooks ou o catálogo completo do ECC. Preservamos o aviso da fonte consultada, sob MIT:

```text
MIT License

Copyright (c) 2026 Affaan Mustafa

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Dependências e outras referências

Three.js é uma dependência de desenvolvimento dos testes, com sua própria licença MIT e copyright dos autores, preservados no pacote instalado pelo npm. Não é embutido no plugin; o consumidor do BookObject fornece um loader compatível quando desejar WebGL.

O hero em `assets/plugin-brand/hero.png` é uma imagem gerada para a Forma. Os símbolos SVG e o layout da apresentação foram criados para este projeto. Procedência e limites estão em `assets/plugin-brand/provenance.json`. O hero não é modelo 3D editável.

A edição comunitária exclui blocos literais de CSS extraídos de terceiros, perfis de projetos privados, binários, capturas privadas e caminhos pessoais. As medições que permanecem são registros de observação com limites, não assets nem código da aplicação observada. A licença MIT da Forma não relicencia os sites, marcas, livros, bibliotecas ou produtos externos citados.

## Perfis de observação

`desktop-material-reference-v1.json` registra observações de uma aplicação desktop 0.19.0. `library-colors.js` é uma implementação independente informada por essa paleta e por parâmetros observados; esses parâmetros não são apresentados como criação visual inédita da Forma. A identidade e os artefatos originais permanecem no arquivo de autoria e não integram a distribuição pública. O perfil público mantém medidas estruturadas e exclui dumps de CSS e expressões CSS literais. Observar uma referência não constitui licença para redistribuir seu código ou sua identidade, nem indica afiliação ou endosso.


## Taste Skill

A síntese de direção específica, argumento por seção, rotas de página/app e crítica renderizada foi informada por [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill), snapshot12af471f627f866411b4bd785b19646d3672784c. O [mapeamento](references/taste-study.md) registra adaptações e limites. Na versão 1.25.0, `assets/reference-library/catalog.json` também incorpora os 202 registros de `library/sites.json`, preservando os campos do snapshot e acrescentando metadados de uso/evidência. `provenance.taste` identifica origem, revisão e hash do arquivo de entrada. Os utilitários da Forma são implementações próprias. Não redistribuímos screenshots, fontes, imagens ou código dos sites; esses ativos externos mantêm licenças próprias. Preservamos o aviso da fonte:

```text
MIT License

Copyright (c) 2026 Leonxlnx

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
