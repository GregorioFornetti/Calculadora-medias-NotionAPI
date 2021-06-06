# Calculadora de médias (NotionAPI)

A calculadora de médias é um programa que pode ser utilizado em conjunto com o [Notion](https://www.notion.so/product?utm_source=google&utm_campaign=2075789713&utm_medium=80211061801&utm_content=453572180157&utm_term=notion&targetid=kwd-312974742&gclid=Cj0KCQjwweyFBhDvARIsAA67M73SmyfGoCQZ83kyVqNBRSLoayTR-75JLgOD77Lf_40lcpRLi8otHL0aAky5EALw_wcB) (aplicativo de organização) para calcular médias escolares de forma automática.


## Vídeo tutorial


## Instalação

Para instalar o programa, siga os passos abaixo:

1- __Baixar o programa__: no topo dessa mesma página, você deverá clicar em um botão escrito __"Code"__, que abrirá uma pequena aba abaixo dele. Nessa aba, clique no botão __"Download zip"__ para que o download do programa seja efetuado. 

![imagem indicando os botões que devem ser clicados](https://github.com/GregorioFornetti/Calculadora-medias-NotionAPI/blob/imgs/Imgs-turorial/Editadas/1.jpg)

2- __Extrair o programa__: o programa baixado virá dentro de uma pasta compactada, então será necessário descompacta-la antes de utilizar o programa. Para isso, coloque essa pasta compactada na sua área de trabalho (ou em qualquer outro lugar que você tenha fácil acesso) e clique com o botão direito nela. Depois disso, abrirá uma aba com várias opções, e você deve escolher a opção __"Extract Here"__ (extrair aqui). 

![imagem indicando a opção que deve ser escolhida](https://github.com/GregorioFornetti/Calculadora-medias-NotionAPI/blob/imgs/Imgs-turorial/Editadas/2.jpg)


## Configurando o notion

Agora que o programa já está instalado, vamos configurar o __notion__ para podermos usar o programa de cálculo de médias.

### Criando e configurando uma integração no Notion

Primeiro, vamos configurar uma integração, que irá permitir que nosso programa tenha acesso aos bancos de dados do notion. Para configurar-la corretamente, siga os passos abaixo:

1- Efetue o login no notion e clique no botão __"Setting & members"__.

![indicação do botão settings e members](https://github.com/GregorioFornetti/Calculadora-medias-NotionAPI/blob/imgs/Imgs-turorial/Editadas/3.jpg)

2- Após clicar nesse botão, abrirá uma nova aba com várias opções. Clique na opção __"Integrations"__ e depois no botão __"Develop your own integrations"__.

![indicação dos botões de integração](https://github.com/GregorioFornetti/Calculadora-medias-NotionAPI/blob/imgs/Imgs-turorial/Editadas/4.jpg)

3- Na nova página aberta, clique no botão __"Create new integration"__

![indicação do botão new integration](https://github.com/GregorioFornetti/Calculadora-medias-NotionAPI/blob/imgs/Imgs-turorial/Editadas/5.jpg)

4- Preencha o campo de nome com um nome qualquer (Ex: calculadora de média) e depois clique no botão __"Submit"__

![indicação de nome e botão de enviar](https://github.com/GregorioFornetti/Calculadora-medias-NotionAPI/blob/imgs/Imgs-turorial/Editadas/6.jpg)

5- Pronto, a integração acabou de ser criada ! Agora, na nova página aberta, copie o __"Token"__ de integração e guarde em algum lugar, pois ele vai ser importante para a configuração do programa.

![indicação de nome e botão de enviar](https://github.com/GregorioFornetti/Calculadora-medias-NotionAPI/blob/imgs/Imgs-turorial/Editadas/7.jpg)

6- Agora, para finalizar essa etapa, selecione a opção __"Internal integration"__ e clique no botão __"Save changes"__.

![salvando as mudanças](https://github.com/GregorioFornetti/Calculadora-medias-NotionAPI/blob/imgs/Imgs-turorial/Editadas/8.jpg)

### Criando e configurando as páginas de matérias no notion

Agora com a integração configurada, podemos começar a criar as páginas de matérias escolares. Para a criação correta das páginas, siga os passos abaixo:

1- Crie uma página principal (com o nome da sua faculdade ou escola) e dentro dessa página adicione outras páginas com o nome das matérias que você está tendo e uma página adicional chamada __"Médias"__ (caso você já tenha criado páginas para a organização das matérias de sua faculdade ou escola, você pode pular esse passo). Para exemplicar, criei uma página com o nome __"Faculdade"__ e dentro dela criei duas matérias (além da página médias): __"Física"__ e __"Matemática"__.

![páginas criadas para o exemplo](https://github.com/GregorioFornetti/Calculadora-medias-NotionAPI/blob/imgs/Imgs-turorial/Editadas/9.jpg)

2- Após criar as páginas, selecione a sua página principal (a página da faculdade ou escola), clique em __"Share"__ e depois no botão azul escrito __"Invite"__.

![indicação share e invite](https://github.com/GregorioFornetti/Calculadora-medias-NotionAPI/blob/imgs/Imgs-turorial/Editadas/10.jpg)

Depois de clicar em __"Invite"__, uma nova aba aparecerá. Nessa aba, procure a sua integração e clique nela (no caso, a integração que eu criei se chama __"Tutorial"__, mas você deve procurar pelo nome que você colocou na sua integração) e clique novamente no botão __"Invite"__.

![invite para a integração](https://github.com/GregorioFornetti/Calculadora-medias-NotionAPI/blob/imgs/Imgs-turorial/Editadas/11.jpg)

OBS: esse passo é essencial para o funcionamento do programa. Se você esquecer essa etapa, será impossível com que o programa acesse o banco de dados do notion.

3- Agora, vamos configurar as páginas das matérias. Dentro de uma das páginas de matérias, crie uma __"Table inline"__ que será onde armazenaremos as notas de umas das médias necessárias para o cálculo da média final.

![criando a tabela de notas](https://github.com/GregorioFornetti/Calculadora-medias-NotionAPI/blob/imgs/Imgs-turorial/Editadas/12.jpg)

Dentro dessa tabela, uma das colunas precisa necessariamente se chamar __"Nota"__, além de ser do tipo __"Number"__ (se o nome ou o tipo dessa coluna estiver incorreto, o programa não conseguirá calcular a média para essa matéria). Nessa coluna, você deverá armazenar todas as notas que pertencem a essa média. Caso tenha algum trabalho ou prova que você já fez e não recebeu a nota, coloque ele dentro dessa coluna com algum valor negativo, pois o programa irá identificar esse número negativo como uma nota ainda não recebida, e no cálculo da média final, no melhor caso ele considerará que você tirou nota máxima (10) e no pior caso considerará que você tirou a pior nota (0).

![criando a coluna de "Nota"](https://github.com/GregorioFornetti/Calculadora-medias-NotionAPI/blob/imgs/Imgs-turorial/Editadas/13.jpg)

4- Agora, basta você fazer esse processo para todas as matérias e médias, armazenando todas as suas notas nessas tabelas. Para exemplificar como que deve ficar as tabelas, irei criar as tabelas para as matérias __"Física"__ e __"Matemática"__. 

![criando a página de física](https://github.com/GregorioFornetti/Calculadora-medias-NotionAPI/blob/imgs/Imgs-turorial/Editadas/14.jpg)

![criando a página de matemática](https://github.com/GregorioFornetti/Calculadora-medias-NotionAPI/blob/imgs/Imgs-turorial/Editadas/15.jpg)

__OBS 1:__ As tabelas podem possuir mais colunas do que apenas a coluna de __"Nota"__.

__OBS 2:__ As abreviaturas que cada média possuem serão essenciais para a criação de uma fórmula para o cálculo da média final e para colocar na tabela de médias finais.

### Configurando a página das médias

Na página de médias, precisamos criar tabelas para armazenar as médias finais de cada matéria. Todas as tabelas serão __"Tables inline"__ com a primeira coluna do tipo __"Title"__ com o nome de __"Caso"__ e as próximas colunas serão todas do tipo __"Number"__, uma com o nome de __"Media"__ e as outras terão o nome da abreviatura das médias da matéria que você está criando a tabela atualmente. Essas tabelas deverão ter duas linhas: __na primeira linha__ coloque __"Melhor caso"__ como valor da coluna de __"Caso"__ e __na segunda linha__ coloque __"Pior caso"__ como valor da coluna de __"Caso"__. Veja a imagem abaixo como exemplo de como deve ficar essas tabelas.

![criando a página de médias](https://github.com/GregorioFornetti/Calculadora-medias-NotionAPI/blob/imgs/Imgs-turorial/Editadas/16.jpg)

### Coletando ids de bancos de dados das tabelas

Agora iremos ver como que coletamos o ids que precisaremos para a próxima etapa (configuração do programa). Para coletar o id de uma tabela, siga os próximos passos:

1- Escolha uma tabela qualquer e clique no botão __"Open as page"__.

![abrindo uma tabela como pagina](https://github.com/GregorioFornetti/Calculadora-medias-NotionAPI/blob/imgs/Imgs-turorial/Editadas/17.jpg)

2- Após efetuar o passo anterior, uma nova pagina será aberta apenas com a tabela que você escolheu. Nessa página, clique no botão __"Share"__ e depois em __"Copy link"__.

![coletando o link da tabela](https://github.com/GregorioFornetti/Calculadora-medias-NotionAPI/blob/imgs/Imgs-turorial/Editadas/18.jpg)

3- Com o link copiado, cole-o em algum documento de texto. No link, você encontrará o id da tabela logo antes de __"?v="__.

![marcação do id do banco de dados dentro do link](https://github.com/GregorioFornetti/Calculadora-medias-NotionAPI/blob/imgs/Imgs-turorial/Editadas/19.jpg)

## Configurando o programa de cálculo de médias

### Configurando o token

### Configurando as matérias

### Transferindo as configurações para o programa desktop

### Executando o programa
